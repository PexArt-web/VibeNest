import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import HomePage from "./pages/Home/HomePage";
import Notification from "./pages/Notification";
import Trending from "./pages/Trending";
import Profile from "./pages/Profile";
import NotFound from "./pages/Errors/NotFound";
import VibeLayOut from "./Layout/VibeLayOut";
import PageLoadError from "./pages/Errors/PageLoadError";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import { signupAction } from "./Handlers/Auth/SignupAction";
import { loginAction } from "./Handlers/Auth/LoginAction";
import { createPostLoader, homeVibeLoader, notificationLoader, profileLoader, trendingLoader, vibeById } from "./Loaders/vibeLoaders";
import CreatePost from "./pages/Home/CreatePost";
import { createVibeAction } from "./Handlers/VibeActions/createVibeAction";
import VibeChats from "./pages/VibeChats";
import VibeDetails from "./pages/Home/vibeView/VibeDetails";
import { vibeComment } from "./Handlers/VibeActions/vibeCommentAction";
import { actionVibe } from "./Handlers/VibeActions/actionVibe";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<PageLoadError />}>
        <Route index element={<SplashScreen />} />
        <Route path="signup" element={<SignUp />} action={signupAction} />
        <Route path="login" element={<Login />} action={loginAction} />
        <Route element={<VibeLayOut />}>
          <Route path="home">
          <Route index element= {<HomePage/>} loader={homeVibeLoader} action={actionVibe} />
          <Route path=":vibeId" element={<VibeDetails/>} loader={vibeById} action={vibeComment} />
          <Route path="create-post" element={<CreatePost/>} loader={createPostLoader} action={createVibeAction} />
          </Route>
          <Route path="notification" element={<Notification />} loader={notificationLoader} />
          <Route path="trending" element={<Trending />} loader={trendingLoader} />

          <Route path="chat" element = {<VibeChats/>} />
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
