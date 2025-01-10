const MatchList = ({ matches, isAdmin, handleEdit, handleDelete, formatDate }) => {
  return (
    <div className="lg:col-span-3 grid gap-8">
      {matches.map((match) => (
        <div
          key={match.id}
          className="bg-gray-800/60 backdrop-blur-md rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border border-gray-700/30 hover:border-gray-600/50"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div className="text-gray-300 font-medium bg-gray-700/50 backdrop-blur-sm px-4 py-2 rounded-2xl inline-block shadow-lg">
                {formatDate(match.date)}
              </div>
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
                vs {match.opponent}
              </div>
              <div className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                {match.score}
              </div>
              {match.scorers && (
                <div className="text-gray-300 mt-2 flex items-center gap-2 bg-gray-700/30 p-3 rounded-2xl">
                  <span className="text-blue-400 text-xl">⚽</span>
                  <span className="font-medium">{match.scorers}</span>
                </div>
              )}
            </div>
            {isAdmin && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(match)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(match.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl"
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