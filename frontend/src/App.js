import React, { useState, useEffect } from 'react';
import Stats from './components/Stats';
import Header from './components/Header';
import NextMatch from './components/NextMatch';
import MatchList from './components/MatchList';
import NavBar from './components/NavBar';

const App = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMatch, setNewMatch] = useState({ date: '', opponent: '', score: '', scorers: '' });
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [nextMatch, setNextMatch] = useState({
    date: new Date().toISOString().split('T')[0],
    opponent: '',
    time: '15:00'
  });
  const [adminToken, setAdminToken] = useState('');
  const [editingMatch, setEditingMatch] = useState(null);
  const [stats, setStats] = useState({
    wins: 0,
    draws: 0,
    losses: 0,
    goals: 0,
    goalsAgainst: 0
  });

  useEffect(() => {
    fetchMatches();
    fetchNextMatch();
  }, []);

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/matches');
      if (!res.ok) throw new Error('Failed to fetch matches');
      const data = await res.json();
      setMatches(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextMatch = async () => {
    try {
      const res = await fetch('http://localhost:5000/next-match');
      if (!res.ok) throw new Error('Failed to fetch next match');
      const data = await res.json();
      if (data) {
        setNextMatch(data);
      }
    } catch (err) {
      console.error('Error fetching next match:', err);
    }
  };



  const handleLogin = () => {
    if (!adminPassword) {
      alert('Please enter the admin password!');
      return;
    }

    fetch('http://localhost:5000/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: adminPassword }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Invalid password');
        return res.json();
      })
      .then(() => {
        setIsAdmin(true);
        setAdminToken(adminPassword); // Store the password as token since we're using it in headers
        setAdminPassword('');
        alert('Login successful');
      })
      .catch((err) => {
        alert(err.message);
        setAdminPassword('');
      });
  };

  const handleAddMatch = async () => {
    console.log('Adding match:', newMatch);
    if (!newMatch.date || !newMatch.opponent || !newMatch.score) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'password': adminToken,
        },
        body: JSON.stringify(newMatch),
      });

      if (!res.ok) throw new Error('Failed to add match');
      await fetchMatches();
      setNewMatch({ date: '', opponent: '', score: '', scorers: '' });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddNextMatch = async () => {
    if (!nextMatch.date || !nextMatch.opponent || !nextMatch.time) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/next-match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'password': adminToken,
        },
        body: JSON.stringify(nextMatch),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update next match');
      }

      await fetchNextMatch();
      alert('Next match updated successfully!');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this match?')) return;

    try {
      const res = await fetch(`http://localhost:5000/matches/${id}`, {
        method: 'DELETE',
        headers: { 'password': adminToken },
      });
      if (!res.ok) throw new Error('Failed to delete match');
      await fetchMatches();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminToken('');
    setShowAdminForm(false);
  };

  const handleEdit = (match) => {
    setEditingMatch(match);
    setNewMatch(match);
    setShowAdminForm(true);
    window.scrollTo(0, document.body.scrollHeight);
  };

  const handleUpdateMatch = async () => {
    if (!editingMatch) return;

    try {
      const res = await fetch(`http://localhost:5000/matches/${editingMatch.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'password': adminToken,
        },
        body: JSON.stringify(newMatch),
      });

      if (!res.ok) throw new Error('Failed to update match');
      await fetchMatches();
      setNewMatch({ date: '', opponent: '', score: '', scorers: '' });
      setEditingMatch(null);
      alert('Match updated successfully!');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateStats = async () => {
    try {
      const res = await fetch('http://localhost:5000/stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'password': adminToken,
        },
        body: JSON.stringify(stats),
      });

      if (!res.ok) throw new Error('Failed to update stats');
      alert('Stats updated successfully!');
    } catch (err) {
      alert(err.message);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (err) {
      console.error('Date formatting error:', err);
      return 'Date unavailable';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <NavBar 
          isAdmin={isAdmin}
          showAdminForm={showAdminForm}
          handleLogout={handleLogout}
          setShowAdminForm={setShowAdminForm}
        />
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-16">
          {/* Next Match Section */}
          <div className="lg:col-span-1">
            <NextMatch nextMatch={nextMatch} formatDate={formatDate} />
          </div>

          {/* Matches Grid */}
          <div className="lg:col-span-2 space-y-8">
            <MatchList
              matches={matches}
              isAdmin={isAdmin}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              formatDate={formatDate}
            />
          </div>
          
          {/* Stats Section */}
          <div className="lg:col-span-1">
            <Stats />
          </div>
        </div>
        

        {showAdminForm && !isAdmin ? (
          <div className="bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700/50 
                         fixed top-24 right-6 w-96 transform transition-all duration-500 ease-in-out hover:scale-[1.02]">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                          from-blue-400 via-purple-400 to-pink-400 mb-8">Admin Access</h2>
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="w-full p-4 border border-gray-700 rounded-xl mb-4 focus:ring-2 
                         focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300
                         bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl
                         font-semibold transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              Login
            </button>
          </div>
        ) : showAdminForm && isAdmin ? (
          <div className="bg-gray-800/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700/50 
                         transform transition-all duration-500 ease-in-out hover:scale-[1.01]">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                          from-blue-400 to-purple-400 mb-6">
              {editingMatch ? 'Edit Match' : 'Add New Match'}
            </h2>
            <div className="grid gap-4">
              <input
                type="date"
                value={newMatch.date}
                onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
                className="w-full p-4 border border-gray-700 rounded-xl focus:ring-2 
                           focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300
                           bg-gray-700/50 backdrop-blur-sm text-white"
              />
              <input
                type="text"
                placeholder="Opponent Team Name"
                value={newMatch.opponent}
                onChange={(e) => setNewMatch({ ...newMatch, opponent: e.target.value })}
                className="w-full p-4 border border-gray-700 rounded-xl focus:ring-2 
                           focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300
                           bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Final Score (e.g., 2-1)"
                value={newMatch.score}
                onChange={(e) => setNewMatch({ ...newMatch, score: e.target.value })}
                className="w-full p-4 border border-gray-700 rounded-xl focus:ring-2 
                           focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300
                           bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Goal Scorers (comma-separated)"
                value={newMatch.scorers}
                onChange={(e) => setNewMatch({ ...newMatch, scorers: e.target.value })}
                className="w-full p-4 border border-gray-700 rounded-xl focus:ring-2 
                           focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300
                           bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400"
              />
              <button
                onClick={editingMatch ? handleUpdateMatch : handleAddMatch}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-4 rounded-xl
                           font-semibold transition-all duration-300 hover:shadow-xl hover:scale-[1.02] mt-2"
              >
                {editingMatch ? 'Update Match' : 'Add Match'}
              </button>
              {editingMatch && (
                <button
                  onClick={() => {
                    setEditingMatch(null);
                    setNewMatch({ date: '', opponent: '', score: '', scorers: '' });
                  }}
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 rounded-xl
                            font-semibold transition-all duration-300 hover:shadow-xl hover:scale-[1.02] mt-2"
                >
                  Cancel Edit
                </button>
              )}
            </div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                          from-blue-400 to-purple-400 mb-6 mt-8">Update Next Match</h2>
            <div className="grid gap-4">
              <input
                type="date"
                value={nextMatch.date}
                onChange={(e) => setNextMatch({ ...nextMatch, date: e.target.value })}
                className="w-full p-4 border border-gray-700 rounded-xl focus:ring-2 
                          focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300
                          bg-gray-700/50 backdrop-blur-sm text-white"
              />
              <input
                type="text"
                placeholder="Opponent Team Name"
                value={nextMatch.opponent}
                onChange={(e) => setNextMatch({ ...nextMatch, opponent: e.target.value })}
                className="w-full p-4 border border-gray-700 rounded-xl focus:ring-2 
                          focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300
                          bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400"
              />
              <input
                type="time"
                value={nextMatch.time}
                onChange={(e) => setNextMatch({ ...nextMatch, time: e.target.value })}
                className="w-full p-4 border border-gray-700 rounded-xl focus:ring-2 
                          focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300
                          bg-gray-700/50 backdrop-blur-sm text-white"
              />
              <button
                onClick={handleAddNextMatch}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-4 rounded-xl
                          font-semibold transition-all duration-300 hover:shadow-xl hover:scale-[1.02] mt-2"
              >
                Update Next Match
              </button>
            </div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                          from-blue-400 to-purple-400 mb-6 mt-8">Update Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <label className='text-white text-center font-bold text-2xl'>
                Wins
                <input
                  type="number"
                  placeholder="Wins"
                  value={stats.wins}
                  onChange={(e) => setStats({ ...stats, wins: parseInt(e.target.value) || 0 })}
                  className="w-full p-4 border border-gray-700 rounded-xl focus:ring-2 
                          focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300
                          bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400"
                />
              </label>
              <label className='text-white text-center font-bold text-2xl'>
                Draws
                <input
                  type="number"
                  placeholder="Draws"
                  value={stats.draws}
                  onChange={(e) => setStats({ ...stats, draws: parseInt(e.target.value) || 0 })}
                  className="w-full p-4 border border-gray-700 rounded-xl focus:ring-2 
                          focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300
                          bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400"
                />
              </label>
              <label className='text-white text-center font-bold text-2xl'>
                Losses
                <input
                  type="number"
                  placeholder="Losses"
                  value={stats.losses}
                  onChange={(e) => setStats({ ...stats, losses: parseInt(e.target.value) || 0 })}
                  className="w-full p-4 border border-gray-700 rounded-xl focus:ring-2 
                          focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300
                          bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400"
                />
              </label>
              <label className='text-white text-center font-bold text-2xl'>
                Goals Scored
                <input
                  type="number"
                  placeholder="Goals Scored"
                  value={stats.goals}
                  onChange={(e) => setStats({ ...stats, goals: parseInt(e.target.value) || 0 })}
                  className="w-full p-4 border border-gray-700 rounded-xl focus:ring-2 
                          focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300
                          bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400"
                />
              </label>
              <label className='text-white text-center font-bold text-2xl' >
                Goals Against
                <input
                  type="number"
                  placeholder="Goals Against"
                  value={stats.goalsAgainst}
                  onChange={(e) => setStats({ ...stats, goalsAgainst: parseInt(e.target.value) || 0 })}
                  className="w-full p-4 border border-gray-700 rounded-xl focus:ring-2 
                          focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300
                          bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400"
                />
              </label>
            </div>
            <button
              onClick={handleUpdateStats}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-4 rounded-xl
                        font-semibold transition-all duration-300 hover:shadow-xl hover:scale-[1.02] mt-4"
            >
              Update Stats
            </button>

          </div>

        ) : null}
      </div>

      <footer className="mt-20 py-10 px-8 bg-gradient-to-b from-transparent to-gray-900/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <p className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 hover:cursor-default">
              &copy; {new Date().getFullYear()} Christodoulos Paschalis. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6">
              <a href="https://github.com/chrispasx" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/christodoulos-paschalis-a53b8b268/" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>


  );
};

export default App;
