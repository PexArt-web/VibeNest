const trendingTopics = [
  { id: 1, title: "#ReactDev", tweets: "120K" },
  { id: 2, title: "#VibeNestLaunch", tweets: "75K" },
  { id: 3, title: "#TailwindCSS", tweets: "68K" },
  { id: 4, title: "#FramerMotion", tweets: "40K" },
  { id: 5, title: "#100DaysOfCode", tweets: "95K" },
];

const Trending = () => {
  return (
    <div className="min-h-screen pt-14 bg-gray-950 text-white mb-14 scroll-smooth">
      <div className="p-4 max-w-xl mx-auto bg-gray-800 rounded-xl shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-purple-600">
          Trending on VibeNest
        </h2>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {trendingTopics.map((trend, index) => (
            <div
              key={trend.id}
              className={`p-4 border-b hover:bg-gray-200 transition duration-200 ${
                index === trendingTopics.length - 1 ? "border-b-0" : ""
              }`}
            >
              <p className="text-sm text-gray-500">#{index + 1} Trending</p>
              <h3 className="text-md font-semibold text-gray-800">
                {trend.title}
              </h3>
              <p className="text-sm text-gray-400">{trend.tweets} mentions</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
