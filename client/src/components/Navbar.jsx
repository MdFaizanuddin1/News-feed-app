import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../redux/userSlice";

const Navbar = () => {
  const auth = useSelector((state) => state.user);
//   console.log('auth is ',auth)
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center bg-blue-300 py-5 gap-2">
      <div className="ml-6 flex gap-3">
        <NavLink
          className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
          to="/"
        >
          Latest
        </NavLink>
        <NavLink
          className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
          to="/category/business"
        >
          Business
        </NavLink>
        <NavLink
          className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
          to="/category/tech"
        >
          Tech
        </NavLink>
        <NavLink
          className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
          to="/category/world"
        >
          World
        </NavLink>
        <NavLink
          className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
          to="/category/sports"
        >
          Sports
        </NavLink>
        <NavLink
          className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
          to="/category_subscribed"
        >
          Subscribed
        </NavLink>
        <NavLink
          className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
          to="/create"
        >
          Publish
        </NavLink>
      </div>
      <div className=" flex gap-3 mr-6">
        {auth.currentUser === null && (
          <Fragment>
            <NavLink
              className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
              to="/sign-in"
            >
              sign-in
            </NavLink>
            <NavLink
              className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
              to="/sign-up"
            >
              sign-up
            </NavLink>
          </Fragment>
        )}
        {auth.currentUser && (
          <Fragment>
            <NavLink
              className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
              to="/profile"
            >
              <span>Profile</span>
            </NavLink>
            <NavLink
              className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
              to="/"
            >
              <span onClick={() => dispatch(logout())}>Log Out</span>
            </NavLink>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Navbar;
