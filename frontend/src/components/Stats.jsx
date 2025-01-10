import React from 'react'
import { useState, useEffect } from 'react'

const Stats = () => {
    const [stats, setStats] = useState({
        wins: 0,
        draws: 0,
        losses: 0,
        goals: 0,
        goalsAgainst: 0
    });
    const [error, setError] = useState(null);

    const fetchStats = async () => {
        try {
            setError(null);
            const res = await fetch('http://localhost:5000/stats');
            if (!res.ok) throw new Error('Failed to fetch stats');
            const data = await res.json();
            setStats(data);
        } catch (err) {
            console.error('Error fetching stats:', err);
            setError('Failed to load stats');
        }
    };

    // Add polling to refresh stats every 5 seconds
    useEffect(() => {
        fetchStats(); // Initial fetch

        const interval = setInterval(() => {
            fetchStats();
        }, 5000); // Fetch every 5 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []); // Empty dependency array means this runs once on mount

    const updateStats = (newStats) => {
        setStats(newStats);
    };

    return (
        <div className=" sticky top-8 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8  mt-4 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-500">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-8">Team Stats</h2>
            {error && <div className="text-red-400 mb-4 bg-red-900/20 p-3 rounded-xl">{error}</div>}
            <div className="grid grid-cols-2 gap-6 text-gray-300">
                <div className="bg-gray-800/50 p-4 rounded-2xl hover:bg-gray-800/70 transition-all duration-300">
                    <div className="text-3xl font-bold text-blue-400">{stats.wins}</div>
                    <div className="text-sm text-gray-400 font-medium">Wins</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-2xl hover:bg-gray-800/70 transition-all duration-300">
                    <div className="text-3xl font-bold text-purple-400">{stats.draws}</div>
                    <div className="text-sm text-gray-400 font-medium">Draws</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-2xl hover:bg-gray-800/70 transition-all duration-300">
                    <div className="text-3xl font-bold text-pink-400">{stats.losses}</div>
                    <div className="text-sm text-gray-400 font-medium">Losses</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-2xl hover:bg-gray-800/70 transition-all duration-300">
                    <div className="text-3xl font-bold text-emerald-400">{stats.goals}</div>
                    <div className="text-sm text-gray-400 font-medium">Goals For</div>
                </div>
                <div className="col-span-2 bg-gray-800/50 p-4 rounded-2xl hover:bg-gray-800/70 transition-all duration-300">
                    <div className="text-3xl font-bold text-amber-400">{stats.goalsAgainst}</div>
                    <div className="text-sm text-gray-400 font-medium">Goals Against</div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
