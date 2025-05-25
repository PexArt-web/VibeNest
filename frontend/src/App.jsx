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
import NotFound from "./pages/errors/NotFound";
import VibeLayOut from "./layout/VibeLayOut";
import PageLoadError from "./pages/errors/PageLoadError";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<PageLoadError/>}>
        <Route index element={<SplashScreen />} />
        <Route element={<VibeLayOut/>}>
          <Route path="home" element={<HomePage />} />
          <Route path="notification" element={<Notification />} />
          <Route path="trending" element={<Trending />} />
          <Route path="profile" element={<Profile />} />
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
