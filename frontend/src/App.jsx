import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import HomePage from "./pages/HomePage";
import Notification from "./pages/Notification";
import Trending from "./pages/Trending";
import Profile from "./pages/Profile";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<SplashScreen/>} />
        <Route path="home" element={<HomePage />} />
        <Route path="notification" element={<Notification />} />
        <Route path="trending" element={<Trending/>} />
        <Route path="profile" element={<Profile/>} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
