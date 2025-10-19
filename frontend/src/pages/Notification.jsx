import { clientSocket, socket } from "@/Services/weBSocket";
import Fallback from "@/Suspense/Fallback";
import { Suspense, useEffect, useState } from "react";
import { FaBell, FaHeart, FaComment, FaRetweet } from "react-icons/fa";
import { Await, useLoaderData } from "react-router-dom";

const Notification = () => {
  const dataElement = useLoaderData();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    clientSocket();

    const fetchNotifications = async () => {
      const notify = await dataElement.notification;
      setNotifications(notify);
    };
    fetchNotifications();

    socket.on("likedVibe", (notificationData) => {
      setNotifications((prevNotification) => [
        ...prevNotification,
        notificationData,
      ]);
    });

    socket.on("commentCreated", (data) => {
      setNotifications((prevData) => [...prevData, data]);
    });

    socket.on("postRevibed", (revibedData)=>{
      setNotifications((prevData)=>[...prevData, revibedData])
    })

    return () => {
      socket.off("likedVibe");
      socket.off("commentCreated");
      socket.off("postRevibed")
    };
  }, [dataElement.notification]);

  return (
    <div className="min-h-screen pt-16 bg-gray-800 px-4 sm:px-8">
      <h2 className="text-2xl font-bold text-green-600 mb-6 mt-2">
        Notifications
      </h2>
      <div className="space-y-4 overflow-hidden pb-25">
        <Suspense
          fallback={
            <Fallback
              loadingTitle={"Please wait while your notification loads"}
              titleFollowUp={"Please Vibe With us a sec.."}
            />
          }
        >
          <Await resolve={dataElement?.notification}>
            {() =>
              notifications?.map((notify) => (
                console.log(notify?.actor, "actor in doing"),
                <>
                  <div
                    key={notify._id}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="text-xl">{notify.icon}</div>
                    <div>
                      <p className="text-gray-800 font-medium">
                        <span className="text-green-600">
                          {notify?.actor?._id === notify.author
                            ? "You"
                            : notify?.actor.displayName}
                        </span>{" "}
                        {notify.message}
                      </p>
                      <span className="text-sm text-gray-500">
                        {notify.createdAt.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </>
              ))
            }
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default Notification;
