
const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-32 relative">
            <h1 className="text-center">cover here</h1>
          <img
            src="https://i.pravatar.cc/150?img=8"
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-white absolute bottom-[-2rem] left-6"
          />
        </div>

        {/* User Info */}
        <div className="pt-16 px-6 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Pex Dev</h2>
              <p className="text-gray-500">@pex_dev</p>
              <p className="text-gray-600 mt-1 text-sm">pex@email.com</p>
            </div>
            <button className="mt-4 sm:mt-0 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="border-t border-gray-200" />

        {/* Posts Section */}
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Posts</h3>

          <div className="space-y-4">
            {/* Sample post card */}
            <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition">
              <p className="text-gray-800">
                Just launched VibeNest 🚀 — catch a vibe, drop a thought.
              </p>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition">
              <p className="text-gray-800">
                Building the frontend with React + Tailwind. Loving the flow!
              </p>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>

            {/* Add more dynamic posts here later */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
