# HellRaiser Frontend

Frontend application for HellRaiser personal account tracking system.

## Features

- React 18 with modern hooks
- Vite for fast development and building
- React Router for navigation
- Socket.IO client for real-time updates
- Sass for styling with organized architecture
- Responsive design

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3001/api
```

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will start on `http://localhost:5173` (or next available port).

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
HellRaiser_Frontend/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Card.jsx
│   │   ├── Button.jsx
│   │   └── SectionTitle.jsx
│   ├── contexts/         # React contexts for state management
│   │   └── AccountContext.jsx
│   ├── layouts/          # Layout components
│   │   ├── MainLayout.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Accounts.jsx
│   │   ├── AccountDetails.jsx
│   │   ├── Tracking.jsx
│   │   ├── Stats.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── services/         # API service layer
│   │   └── api.js
│   ├── styles/           # SCSS styles
│   │   ├── variables.scss
│   │   ├── mixins.scss
│   │   ├── base.scss
│   │   ├── layouts.scss
│   │   ├── components.scss
│   │   ├── pages.scss
│   │   └── main.scss
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Application entry point
├── public/               # Static assets
├── index.html            # HTML template
└── vite.config.js        # Vite configuration
```

## Pages

- **Home** - Landing page
- **Accounts** - List of tracked accounts
- **Account Details** - Individual account information
- **Tracking** - Track account progress over time
- **Stats** - View aggregated statistics
- **About** - About the application
- **Contact** - Contact information

## Components

- **Card** - Reusable card component
- **Button** - Button component with variants
- **SectionTitle** - Section header with title and subtitle

## API Integration

The application communicates with the HellRaiser backend API. See `src/services/api.js` for API methods.

## Dependencies

- react - UI library
- react-dom - React DOM renderer
- react-router-dom - Routing
- socket.io-client - WebSocket client
- sass - CSS preprocessor (dev)
- vite - Build tool (dev)
- gh-pages - GitHub Pages deployment (dev)

## Development

The project uses Vite for fast HMR (Hot Module Replacement) during development.

## Deployment

The project can be deployed to GitHub Pages using:

```bash
npm run deploy
```

Make sure to update the `base` path in `vite.config.js` to match your repository name.

