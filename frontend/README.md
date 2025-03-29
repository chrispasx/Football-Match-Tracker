# - Match Tracker

A modern, responsive web application for tracking football matches and team statistics. Built with React and Node.js, featuring real-time updates and an admin dashboard.

## 🌟 Features

- **Match Management**
  - View upcoming matches with date and time
  - Track match history and results
  - Record scores and goal scorers
  - Edit or delete past matches

- **Statistics Dashboard**
  - Real-time win/loss/draw statistics
  - Goal tracking (scored and conceded)
  - Season performance overview

- **Admin Features**
  - Secure admin dashboard
  - Match data management
  - Next match scheduling
  - Statistics updates

- **User Interface**
  - Modern, responsive design
  - Real-time updates
  - Mobile-friendly layout
  - Smooth animations and transitions

## 🚀 Tech Stack

### Frontend
- **React 18+** - Modern UI library
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management and side effects
- **Fetch API** - Data fetching and updates

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **SQLite3** - Database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd mpala
```

2. **Set up the backend**
```bash
cd backend
npm install
```

3. **Create environment variables**
```bash
# Create .env file in backend directory
echo "ADMIN_PASSWORD=your_secure_password" > .env
```

4. **Set up the frontend**
```bash
cd ../frontend
npm install
```

## 🚦 Running the Application

1. **Start the backend server**
```bash
cd backend
node server.js
```

2. **Start the frontend development server**
```bash
cd frontend
npm start
```

3. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
mpala/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Stats.jsx
│   │   │   └── ... 
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
│
└── backend/
    ├── server.js
    ├── football.db
    ├── .env
    └── package.json
```

## 🔑 API Endpoints

- `GET /matches` - Retrieve all matches
- `POST /matches` - Add a new match
- `PUT /matches/:id` - Update match details
- `DELETE /matches/:id` - Delete a match
- `GET /next-match` - Get upcoming match
- `POST /next-match` - Update upcoming match
- `GET /stats` - Get team statistics
- `POST /stats` - Update team statistics
- `POST /authenticate` - Admin authentication

## 🛠️ Development

- Follow ESLint rules for code consistency
- Use meaningful commit messages
- Test new features before pushing
- Keep dependencies updated

## 📝 License

MIT License - See LICENSE file for details

## 👥 Contributors

- Christodoulos Paschalis - Developer & Maintainer

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support or questions, please email [your-email@example.com]
