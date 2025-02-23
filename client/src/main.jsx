import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home.jsx";

import { Provider } from "react-redux";
import { store } from "./app/store";
import SpecificNews from "./components/pages/SpecificPage.jsx";
import SignIn from "./components/auth/SignIn.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import Logout from "./components/auth/Logout.jsx";
import NewsFeedByCat from "./components/pages/NewsByCategory.jsx";
import Profile from "./components/Profile.Page.jsx";
import Subscribed from './components/pages/subscribedCategories.jsx'
import Create from './components/pages/Create.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/news/:id" element={<SpecificNews />} />

      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="log-out" element={<Logout />} />
      <Route path="profile" element={<Profile />} />
      <Route path="/category/:category" element={<NewsFeedByCat />} />
      <Route path="/category_subscribed" element={<Subscribed />} />
      <Route path="/create" element={<Create />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
