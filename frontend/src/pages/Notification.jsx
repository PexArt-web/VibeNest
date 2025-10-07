import { clientSocket, socket } from "@/Services/weBSocket";
import { useEffect, useState } from "react";
import { FaBell, FaHeart, FaComment, FaRetweet } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";

// const notifications = [
//   {
//     id: 1,
//     type: "like",
//     user: "Lexa",
//     action: "liked your post",
//     time: "2m ago",
//     icon: <FaHeart className="text-red-500" />,
//   },
//   {
//     id: 2,
//     type: "comment",
//     user: "Jay",
//     action: "commented on your vibe",
//     time: "10m ago",
//     icon: <FaComment className="text-blue-500" />,
//   },
//   {
//     id: 3,
//     type: "repost",
//     user: "Nova",
//     action: "reposted your vibe",
//     time: "30m ago",
//     icon: <FaRetweet className="text-green-500" />,
//   },
// ];

const Notification = () => {
  const dataElement = useLoaderData()
  const [notifications, setNotifications] = useState([]);

  console.log(dataElement, "notification element")

  useEffect(() => {
    clientSocket();

    const fetchNotifications = async () =>{
      const notify = await dataElement.notification
      setNotifications(notify)
    }
    fetchNotifications

    socket.on("likedVibe", (notificationData) => {
      console.log(notificationData);
      setNotifications((prevNotification) => [
        ...prevNotification,
        notificationData,
      ]);
    });

    return () => {
      socket.off("likedVibe");
    };
  }, [dataElement.notification]);
  return (
    <div className="min-h-screen pt-16 bg-gray-800 px-4 sm:px-8">
      <h2 className="text-2xl font-bold text-green-600 mb-6">Notifications</h2>
      <div className="space-y-4">
        {notifications.map((notify) => (
          console.log(notify),
          <div
            key={notify.id}
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-xl">{notify.icon}</div>
            <div>
              <p className="text-gray-800 font-medium">
                <span className="text-green-600">{notify.user}</span>{" "}
                {notify.action}
              </p>
              <span className="text-sm text-gray-500">{notify.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
