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
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 sticky mt-4">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">Stats</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="grid grid-cols-2 gap-4 text-gray-300">
                <div>
                    <div className="text-2xl font-bold">{stats.wins}</div>
                    <div>Wins</div>
                </div>
                <div>
                    <div className="text-2xl font-bold">{stats.draws}</div>
                    <div>Draws</div>
                </div>
                <div>
                    <div className="text-2xl font-bold">{stats.losses}</div>
                    <div>Losses</div>
                </div>
                <div>
                    <div className="text-2xl font-bold">{stats.goals}</div>
                    <div>Goals</div>
                </div>
                <div>
                    <div className="text-2xl font-bold">{stats.goalsAgainst}</div>
                    <div>Goals Against</div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
