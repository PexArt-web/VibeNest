import { useAuthContext } from "@/Hooks/useAuthContext";
import SharedButton from "../Shared/Component/SharedButton";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";

const Profile = () => {
  const { user } = useAuthContext();
  const dataElements = useLoaderData();
  const [profilePosts, setProfilePosts] = useState([]);
  useEffect(() => {
    const fetchProfilePost = async () => {
      const profilePosts = (await dataElements?.usersVibe) || [];
      setProfilePosts(profilePosts);
    };
    fetchProfilePost();
  }, [dataElements, profilePosts]);

console.log(profilePosts, "profilePosts");
  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 pt-14 mb-11 mt-5">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-32 relative">
          <h1 className="text-center">cover here</h1>
          <img
            src={user?.user.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-white absolute bottom-[-2rem] left-6"
          />
        </div>

        <div className="pt-16 px-6 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {user?.user.displayName}
              </h2>
              <p className="text-gray-500">{user?.user.username}</p>
              <p className="text-gray-600 mt-1 text-sm">{user?.user.email}</p>
            </div>
            <SharedButton
              className={
                "mt-4 sm:mt-0 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition"
              }
              label={"Edit Profile"}
            />
          </div>
        </div>

        <div className="border-t border-gray-200" />

        {/* Posts Section */}
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Your Posts
          </h3>

          <div className="space-y-4">
            <Suspense fallback={<div>Loading posts...</div>}>
              <Await resolve={dataElements?.usersVibe}>
                {() => {
                  return profilePosts?.vibe?.map((post) => (
                    console.log(post, "post"),
                    <div
                      key={post._id}
                      className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition"
                    >
                      <p className="text-gray-800">{post.vibe}</p>
                      <span className="text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ));
                }}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
