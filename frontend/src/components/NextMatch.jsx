const NextMatch = ({ nextMatch, formatDate }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 sticky top-8 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-500 hover:transform hover:scale-[1.02]">
      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-8">
        Next Match
      </h2>
      <div className="space-y-6">
        <div className="text-gray-300 font-medium bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm px-5 py-3 rounded-2xl inline-block shadow-lg border border-gray-700/50">
          {formatDate(nextMatch.date)}
        </div>
        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300 leading-tight">
          vs {nextMatch.opponent}
        </div>
        <div className="text-gray-300">
          <div className="flex items-center gap-3 mb-2 bg-gray-800/50 p-4 rounded-2xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
            <span className="text-blue-400 text-xl">🕒</span>
            <span className="font-semibold text-lg">{nextMatch.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextMatch;