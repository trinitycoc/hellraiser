import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DEFAULT_PLAYER_TAG } from '../config/constants'
import { fetchAccountDetails } from '../services/api'
import Card from '../components/Card'

function AccountDetails() {
  const { accountTag } = useParams()
  // If accountTag is undefined, use default. If it exists but doesn't start with #, add it.
  let effectiveTag = accountTag || DEFAULT_PLAYER_TAG
  // Ensure the tag always starts with #
  if (effectiveTag && !effectiveTag.startsWith('#')) {
    effectiveTag = `#${effectiveTag}`
  }
  const [account, setAccount] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // State for toggling sections - only one can be open at a time
  const [activeSection, setActiveSection] = useState(null)

  useEffect(() => {
    const loadAccountDetails = async () => {
      try {
        setLoading(true)
        console.log('Fetching account details for:', effectiveTag)
        const data = await fetchAccountDetails(effectiveTag)
        console.log('Account data received:', data)
        setAccount(data)
        setError(null)
      } catch (error) {
        console.error('Error loading account details:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadAccountDetails()
  }, [effectiveTag])

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <h2>Loading account details...</h2>
          <p>Fetching data for {effectiveTag}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-container">
          <h2>Error Loading Account</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!account) {
    return (
      <div className="container">
        <p>No account data available.</p>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="account-header-details">
        <div className="account-name-section">
          <h1 className="account-name">{account.name}</h1>
          <p className="account-tag">{account.tag}</p>
        </div>
        <div className="account-stats-header">
          <div className="stat-item">
            <img
              src={`/th-${account.townHallLevel}.png`}
              alt={`Town Hall ${account.townHallLevel}`}
              className="th-icon"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="stat-content">
              <span className="stat-label">Town Hall</span>
              <span className="stat-value">Level {account.townHallLevel}</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-content">
              <span className="stat-label">XP Level</span>
              <span className="stat-value">{account.expLevel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clan Information */}
      {account.clan && (
        <div className="clan-header-details">
          <div className="clan-badge-container">
            <img
              src={account.clan.badge?.medium}
              alt="Clan Badge"
              className="clan-badge-large"
            />
          </div>
          <div className="clan-info-details">
            <h2 className="clan-name">{account.clan.name}</h2>
            <p className="clan-tag">{account.clan.tag}</p>
          </div>
          <div className="clan-extra-info">
            {account.clan.level && (
              <div className="clan-stat">
                <span className="clan-stat-label">Clan Level</span>
                <span className="clan-stat-value">{account.clan.level}</span>
              </div>
            )}
            {account.role && (
              <div className="clan-stat">
                <span className="clan-stat-label">Role</span>
                <span className="clan-stat-value capitalize">{account.role}</span>
              </div>
            )}
            <div className="clan-stat">
              <span className="clan-stat-label">War Preference</span>
              <span className="clan-stat-value">{account.warOptedIn ? 'Opted In' : 'Opted Out'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Trophies, War Stats, Donations Grid */}
      <div className="account-grid-three">
        {/* Trophies */}
        <Card title="Trophies">
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Current Trophies</span>
              <span className="info-value">{account.trophies.toLocaleString()}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Best Trophies</span>
              <span className="info-value">{account.bestTrophies.toLocaleString()}</span>
            </div>
            {account.builderBaseTrophies && (
              <div className="info-item">
                <span className="info-label">Builder Base Trophies</span>
                <span className="info-value">{account.builderBaseTrophies.toLocaleString()}</span>
              </div>
            )}
          </div>
        </Card>

        {/* War Stats */}
        <Card title="War Statistics">
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">War Stars</span>
              <span className="info-value">{account.warStars.toLocaleString()}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Attack Wins (Season)</span>
              <span className="info-value">{account.attackWins}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Defense Wins (Season)</span>
              <span className="info-value">{account.defenseWins}</span>
            </div>
          </div>
        </Card>

        {/* Donations */}
        <Card title="Donations (Season)">
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Donated</span>
              <span className="info-value">{account.donations.toLocaleString()}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Received</span>
              <span className="info-value">{account.received.toLocaleString()}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Capital Contributions</span>
              <span className="info-value">{account.clanCapitalContributions.toLocaleString()}</span>
            </div>
          </div>
        </Card>
      </div>


      <div className="account-grid">

        {/* Toggle Buttons Row */}
        <div className="toggle-buttons-row">
          {account.league && account.league.name && (
            <button
              className="toggle-button"
              onClick={() => setActiveSection(activeSection === 'league' ? null : 'league')}
            >
              {activeSection === 'league' ? 'Hide' : 'Show'} League
            </button>
          )}
          {account.achievements && account.achievements.length > 0 && (
            <button
              className="toggle-button"
              onClick={() => setActiveSection(activeSection === 'achievements' ? null : 'achievements')}
            >
              {activeSection === 'achievements' ? 'Hide' : 'Show'} Achievements
            </button>
          )}
          {account.heroes && account.heroes.length > 0 && (
            <button
              className="toggle-button"
              onClick={() => setActiveSection(activeSection === 'heroes' ? null : 'heroes')}
            >
              {activeSection === 'heroes' ? 'Hide' : 'Show'} Heroes
            </button>
          )}
          {account.troops && account.troops.length > 0 && (
            <button
              className="toggle-button"
              onClick={() => setActiveSection(activeSection === 'troops' ? null : 'troops')}
            >
              {activeSection === 'troops' ? 'Hide' : 'Show'} Troops
            </button>
          )}
          {account.spells && account.spells.length > 0 && (
            <button
              className="toggle-button"
              onClick={() => setActiveSection(activeSection === 'spells' ? null : 'spells')}
            >
              {activeSection === 'spells' ? 'Hide' : 'Show'} Spells
            </button>
          )}
          {account.heroEquipment && account.heroEquipment.length > 0 && (
            <button
              className="toggle-button"
              onClick={() => setActiveSection(activeSection === 'equipment' ? null : 'equipment')}
            >
              {activeSection === 'equipment' ? 'Hide' : 'Show'} Equipment
            </button>
          )}
        </div>

        {/* League */}
        {activeSection === 'league' && account.league && account.league.name && (
          <div className="section-container">
            <div className="league-container">
              {account.league.iconUrls && (
                <img
                  src={account.league.iconUrls.medium}
                  alt={account.league.name}
                  className="league-icon"
                />
              )}
              <div className="league-info">
                <h3 className="league-name">{account.league.name}</h3>
                {account.league.id && (
                  <p className="league-id">ID: {account.league.id}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Achievements */}
        {activeSection === 'achievements' && account.achievements && account.achievements.length > 0 && (
          <div className="section-header">
            <h3>Achievements ({account.achievements.length})</h3>
          </div>
        )}
        {activeSection === 'achievements' && account.achievements && account.achievements.length > 0 && (
          <div className="section-content">
            <div className="achievements-list">
              {account.achievements.map((achievement, index) => (
                <div key={index} className={`achievement-item ${achievement.stars === 3 ? 'complete' : achievement.stars > 0 ? 'partial' : ''}`}>
                  <div className="achievement-header">
                    <div className="achievement-info">
                      <h4 className="achievement-name">{achievement.name}</h4>
                      {achievement.info && <p className="achievement-description">{achievement.info}</p>}
                    </div>
                    <div className="achievement-stars">
                      {[1, 2, 3].map((star) => (
                        <span key={star} className={`star ${star <= achievement.stars ? 'filled' : ''}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  {achievement.value !== undefined && achievement.target !== undefined && (
                    <div className="achievement-progress">
                      <div className="progress-bar-container">
                        <div
                          className="progress-bar"
                          style={{ width: `${Math.min((achievement.value / achievement.target) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="progress-text">
                        {achievement.value.toLocaleString()} / {achievement.target.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {achievement.completionInfo && (
                    <p className="achievement-completion">{achievement.completionInfo}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Heroes */}
        {activeSection === 'heroes' && account.heroes && account.heroes.length > 0 && (
          <div className="section-header">
            <h3>Heroes ({account.heroes.length})</h3>
          </div>
        )}
        {activeSection === 'heroes' && account.heroes && account.heroes.length > 0 && (
          <div className="section-content">
            <div className="heroes-list">
              {account.heroes.map((hero, index) => (
                <div key={index} className={`hero-item ${hero.isMax ? 'max-level' : ''}`}>
                  <div className="hero-header">
                    <span className="hero-name">
                      {hero.name}
                      {hero.isMax && <span className="max-badge">MAX</span>}
                    </span>
                    <span className="hero-level">Lv {hero.level}/{hero.maxLevel}</span>
                  </div>
                  {hero.village && (
                    <span className="hero-village">Village: {hero.village}</span>
                  )}
                  {hero.equipment && hero.equipment.length > 0 && (
                    <div className="hero-equipment">
                      <strong>Equipment:</strong>
                      <div className="equipment-grid">
                        {hero.equipment.map((eq, eqIndex) => (
                          <div key={eqIndex} className="equipment-item-with-icon">
                            <img
                              src={`/equipment-${eq.name.toLowerCase().replace(/\s+/g, '-')}.png`}
                              alt={eq.name}
                              className="equipment-icon"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                            <div className="equipment-details">
                              <span className="equipment-name">{eq.name}</span>
                              <span className="equipment-level">Lv {eq.level}/{eq.maxLevel}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Troops */}
        {activeSection === 'troops' && account.troops && account.troops.length > 0 && (
          <div className="section-header">
            <h3>Troops ({account.troops.length})</h3>
          </div>
        )}
        {activeSection === 'troops' && account.troops && account.troops.length > 0 && (
          <div className="section-content">
            <div className="troops-list">
              {account.troops.map((troop, index) => (
                <div key={index} className={`troop-item ${troop.isMax ? 'max-level' : ''} ${troop.isSuperTroop ? 'super-troop' : ''}`}>
                  <div className="troop-header">
                    <span className="troop-name">
                      {troop.name}
                      {troop.isActive && <span className="active-badge">Active</span>}
                      {troop.isSuperTroop && <span className="super-badge">Super</span>}
                    </span>
                    <span className="troop-level">
                      Lv {troop.level}/{troop.maxLevel}
                      {troop.isMax && <span className="max-badge">MAX</span>}
                    </span>
                  </div>
                  <div className="troop-details">
                    {troop.village && <span>Village: {troop.village}</span>}
                    {troop.housingSpace !== undefined && <span>Housing: {troop.housingSpace}</span>}
                    {troop.dps !== undefined && <span>DPS: {troop.dps}</span>}
                    {troop.trainingTime !== undefined && <span>Train Time: {troop.trainingTime}s</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spells */}
        {activeSection === 'spells' && account.spells && account.spells.length > 0 && (
          <div className="section-header">
            <h3>Spells ({account.spells.length})</h3>
          </div>
        )}
        {activeSection === 'spells' && account.spells && account.spells.length > 0 && (
          <div className="section-content">
            <div className="spells-list">
              {account.spells.map((spell, index) => (
                <div key={index} className={`troop-item ${spell.isMax ? 'max-level' : ''}`}>
                  <div className="troop-header">
                    <span className="troop-name">{spell.name}</span>
                    <span className="troop-level">
                      Lv {spell.level}/{spell.maxLevel}
                      {spell.isMax && <span className="max-badge">MAX</span>}
                    </span>
                  </div>
                  <div className="troop-details">
                    {spell.village && <span>Village: {spell.village}</span>}
                    {spell.housingSpace !== undefined && <span>Housing: {spell.housingSpace}</span>}
                    {spell.dps !== undefined && <span>DPS: {spell.dps}</span>}
                    {spell.trainingTime !== undefined && <span>Train Time: {spell.trainingTime}s</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hero Equipment */}
        {activeSection === 'equipment' && account.heroEquipment && account.heroEquipment.length > 0 && (
          <div className="section-header">
            <h3>Hero Equipment ({account.heroEquipment.length})</h3>
          </div>
        )}
        {activeSection === 'equipment' && account.heroEquipment && account.heroEquipment.length > 0 && (
          <div className="section-content">
            <div className="equipment-list-with-icons">
              {account.heroEquipment.map((eq, index) => (
                <div key={index} className={`equipment-item-card ${eq.level === eq.maxLevel ? 'max-level' : ''}`}>
                  <img
                    src={`/equipment-${eq.name.toLowerCase().replace(/\s+/g, '-')}.png`}
                    alt={eq.name}
                    className="equipment-icon-card"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="equipment-info-card">
                    <span className="equipment-name">{eq.name}</span>
                    <span className="equipment-level">
                      Lv {eq.level}/{eq.maxLevel}
                      {eq.level === eq.maxLevel && <span className="max-badge">MAX</span>}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountDetails

