import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    fetchMatches();
    fetchNextMatch(); // Add this line
  }, []);

  const fetchMatches = async () => {
    try {
      const res = await fetch('http://localhost:5000/matches');
      if (!res.ok) throw new Error('Failed to fetch matches');
      const data = await res.json();
      setMatches(data);
    } catch (err) {
      setError(err.message);
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
      .then((data) => {
        setIsAdmin(true);
        setAdminToken(adminPassword); // Store the token
        setAdminPassword('');
        alert('Login successful');
      })
      .catch((err) => alert(err.message));
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

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-16 tracking-tight">
          Football Match Records
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Next Match Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
                Next Match
              </h2>
              <div className="space-y-4">
                <div className="text-gray-300 font-medium bg-gray-700 px-4 py-1 rounded-full inline-block">
                  {new Date(nextMatch.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <div className="text-2xl font-bold text-gray-100">
                  vs {nextMatch.opponent}
                </div>
                <div className="text-gray-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-400">🕒</span>
                    <span>{nextMatch.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Matches Grid - adjust column span */}
          <div className="lg:col-span-3 grid gap-8">
            {matches.map((match) => (
              <div
                key={match.id}
                className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform transition-all duration-300 
                           hover:scale-[1.02] hover:shadow-2xl border border-gray-700/20"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <div className="text-gray-300 font-medium bg-gray-700 px-4 py-1 rounded-full inline-block">
                      {new Date(match.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="text-2xl font-bold text-gray-100">
                      vs {match.opponent}
                    </div>
                    <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 
                                  text-transparent bg-clip-text">
                      {match.score}
                    </div>
                    {match.scorers && (
                      <div className="text-gray-300 mt-2 flex items-center gap-2">
                        <span className="text-blue-400 text-xl">⚽</span>
                        <span className="font-medium">{match.scorers}</span>
                      </div>
                    )}
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(match.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl
                               transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowAdminForm(!showAdminForm)}
          className="fixed top-6 right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                     px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
                     text-sm font-semibold hover:scale-105"
        >
          {showAdminForm ? 'Close Admin' : 'Admin Login'}
        </button>

        {showAdminForm && !isAdmin ? (
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700/20 
                         fixed top-20 right-6 w-96">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                          from-blue-400 to-purple-400 mb-6">Admin Access</h2>
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
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700/20">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
                          from-blue-400 to-purple-400 mb-6">Add New Match</h2>
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
                onClick={handleAddMatch}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-4 rounded-xl
                           font-semibold transition-all duration-300 hover:shadow-xl hover:scale-[1.02] mt-2"
              >
                Add Match
              </button>
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
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
