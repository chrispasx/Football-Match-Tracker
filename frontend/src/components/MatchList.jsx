const MatchList = ({ matches, isAdmin, handleEdit, handleDelete, formatDate }) => {
  return (
    <div className="space-y-6">
      {matches.map((match) => (
        <div
          key={match.id}
          className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md rounded-3xl 
                     shadow-2xl p-8 transform transition-all duration-500 hover:scale-[1.02] 
                     hover:shadow-2xl border border-gray-700/30 hover:border-gray-600/50 group"
        >
          <div className="flex justify-between items-start gap-6">
            <div className="space-y-6 flex-1">
              <div className="text-gray-300 font-medium bg-gradient-to-r from-gray-800/80 
                            to-gray-700/80 backdrop-blur-sm px-5 py-3 rounded-2xl inline-block 
                            shadow-lg border border-gray-700/50 group-hover:border-gray-600/50 
                            transition-all duration-300">
                {formatDate(match.date)}
              </div>
              <div className="text-4xl font-black text-transparent bg-clip-text 
                            bg-gradient-to-r from-gray-100 to-gray-300 leading-tight">
                vs {match.opponent}
              </div>
              <div className="text-5xl font-black bg-gradient-to-r from-blue-400 
                            via-purple-400 to-pink-400 text-transparent bg-clip-text">
                {match.score}
              </div>
              {match.scorers && (
                <div className="text-gray-300 mt-4 flex items-center gap-3 bg-gray-800/50 
                              p-4 rounded-2xl border border-gray-700/30 
                              group-hover:border-gray-600/50 transition-all duration-300">
                  <span className="text-blue-400 text-xl">⚽</span>
                  <span className="font-medium">{match.scorers}</span>
                </div>
              )}
            </div>
            {isAdmin && (
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(match)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 
                           hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all 
                           duration-300 text-sm font-semibold shadow-lg hover:shadow-xl"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(match.id)}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 
                           hover:to-red-700 text-white px-6 py-3 rounded-xl transition-all 
                           duration-300 text-sm font-semibold shadow-lg hover:shadow-xl"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchList;