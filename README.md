# ΔΕΝ ΜΠΟΡΟΥΣΙΑΝ ΝΤΟΡΤΜΟΥΝΤ - Match Tracker

A web application for tracking football matches, built with React and Node.js.

## Features

- View upcoming matches and match history
- Track match scores and goal scorers
- Admin dashboard for managing matches
- Real-time statistics tracking
- Responsive design with Tailwind CSS
- Secure authentication system

## Tech Stack

### Frontend
- React
- Tailwind CSS
- React Hooks
- Modern ES6+ JavaScript

### Backend
- Node.js
- Express
- SQLite3
- JSON Web Tokens
- Environment Variables (dotenv)

## Getting Started

1. Clone the repository:
```sh
git clone [your-repo-url]
```

2. Install dependencies for both frontend and backend:
```sh
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Create a `.env` file in the backend directory:
```
ADMIN_PASSWORD=your-secure-password
```

4. Start the development servers:
```sh
# Start backend server (from backend directory)
node server.js

# Start frontend development server (from frontend directory)
npm start
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

## Project Structure
```
├── backend/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## License
MIT

## Author
Christodoulos Paschalis
