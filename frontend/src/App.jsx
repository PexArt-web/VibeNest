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
import NotFound from "./pages/Errors/NotFound";
import VibeLayOut from "./Layout/VibeLayOut";
import PageLoadError from "./pages/Errors/PageLoadError";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import { signupAction } from "./Handlers/SignupAction";
import { loginAction } from "./Handlers/LoginAction";
import { homeVibeLoader, notificationLoader, profileLoader, trendingLoader } from "./Loaders/vibeLoaders";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<PageLoadError />}>
        <Route index element={<SplashScreen />} />
        <Route path="signup" element={<SignUp />} action={signupAction} />
        <Route path="login" element={<Login />} action={loginAction} />
        <Route element={<VibeLayOut />}>
          <Route path="home" element={<HomePage />} loader = {homeVibeLoader} />
          <Route path="notification" element={<Notification />} loader={notificationLoader} />
          <Route path="trending" element={<Trending />} loader={trendingLoader} />
          <Route path="profile" element={<Profile />} loader={profileLoader} />
        </Route>

        <Route path="*" element={<NotFound />} />
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
