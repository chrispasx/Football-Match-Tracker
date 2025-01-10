const NextMatch = ({ nextMatch, formatDate }) => {
  return (
    <div className="bg-gray-800/60 backdrop-blur-md rounded-3xl shadow-2xl p-8 sticky top-8 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-500">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
        Next Match
      </h2>
      <div className="space-y-4">
        <div className="text-gray-300 font-medium bg-gray-700/50 backdrop-blur-sm px-4 py-2 rounded-2xl inline-block shadow-lg">
          {formatDate(nextMatch.date)}
        </div>
        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
          vs {nextMatch.opponent}
        </div>
        <div className="text-gray-300">
          <div className="flex items-center gap-2 mb-2 bg-gray-700/30 p-3 rounded-2xl">
            <span className="text-blue-400">🕒</span>
            <span className="font-medium">{nextMatch.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextMatch;