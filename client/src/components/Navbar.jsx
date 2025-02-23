// import { Fragment } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { logout } from "../redux/userSlice";

// const Navbar = () => {
//   const auth = useSelector((state) => state.user);
//   //   console.log('auth is ',auth)
//   const dispatch = useDispatch();

//   return (
//     <div className="flex justify-between items-center bg-blue-300 py-5 gap-2">
//       <div className="ml-6 flex gap-3">
//         <NavLink
//           className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
//           to="/"
//         >
//           Latest
//         </NavLink>
//         <NavLink
//           className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
//           to="/category/business"
//         >
//           Business
//         </NavLink>
//         <NavLink
//           className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
//           to="/category/tech"
//         >
//           Tech
//         </NavLink>
//         <NavLink
//           className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
//           to="/category/world"
//         >
//           World
//         </NavLink>
//         <NavLink
//           className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
//           to="/category/sports"
//         >
//           Sports
//         </NavLink>
//         <NavLink
//           className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
//           to="/category_subscribed"
//         >
//           Subscribed
//         </NavLink>
//         if(auth.currentUser && (
//         <NavLink
//           className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
//           to="/create"
//         >
//           Publish
//         </NavLink>
//         ))
//       </div>
//       <div className=" flex gap-3 mr-6">
//         {auth.currentUser === null && (
//           <Fragment>
//             <NavLink
//               className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
//               to="/sign-in"
//             >
//               sign-in
//             </NavLink>
//             <NavLink
//               className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
//               to="/sign-up"
//             >
//               sign-up
//             </NavLink>
//           </Fragment>
//         )}
//         {auth.currentUser && (
//           <Fragment>
//             <NavLink
//               className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
//               to="/profile"
//             >
//               <span>Profile</span>
//             </NavLink>
//             <NavLink
//               className="font-bold text-blue-900 hover:text-blue-950 hover:underline"
//               to="/"
//             >
//               <span onClick={() => dispatch(logout())}>Log Out</span>
//             </NavLink>
//           </Fragment>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing icons

const Navbar = () => {
  const auth = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <div className="flex justify-between items-center bg-blue-300 py-5 px-6">
        {/* Left Side - Hamburger Menu for Small Screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-blue-900 text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Large Screens - Menu Always Visible */}
        <div className="hidden md:flex gap-4">
          <NavLink className="font-bold text-blue-900 hover:underline" to="/">
            Latest
          </NavLink>
          <NavLink
            className="font-bold text-blue-900 hover:underline"
            to="/category/business"
          >
            Business
          </NavLink>
          <NavLink
            className="font-bold text-blue-900 hover:underline"
            to="/category/tech"
          >
            Tech
          </NavLink>
          <NavLink
            className="font-bold text-blue-900 hover:underline"
            to="/category/world"
          >
            World
          </NavLink>
          <NavLink
            className="font-bold text-blue-900 hover:underline"
            to="/category/sports"
          >
            Sports
          </NavLink>
          <NavLink
            className="font-bold text-blue-900 hover:underline"
            to="/category_subscribed"
          >
            Subscribed
          </NavLink>
          {auth.currentUser && (
            <NavLink
              className="font-bold text-blue-900 hover:underline"
              to="/create"
            >
              Publish
            </NavLink>
          )}
        </div>

        {/* Right Side - Auth Options */}
        <div className="flex gap-3">
          {auth.currentUser ? (
            <>
              <NavLink
                className="font-bold text-blue-900 hover:underline"
                to="/profile"
              >
                Profile
              </NavLink>
              <button
                onClick={() => dispatch(logout())}
                className="font-bold text-blue-900 hover:underline"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink
                className="font-bold text-blue-900 hover:underline"
                to="/sign-in"
              >
                Sign In
              </NavLink>
              <NavLink
                className="font-bold text-blue-900 hover:underline"
                to="/sign-up"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu - Pushes Content Down */}
      {isOpen && (
        <div className="md:hidden bg-white w-full p-6 shadow-lg">
          <nav className="flex flex-col gap-4">
            <NavLink
              className="font-bold text-blue-900 hover:underline"
              to="/"
              onClick={closeMenu}
            >
              Latest
            </NavLink>
            <NavLink
              className="font-bold text-blue-900 hover:underline"
              to="/category/business"
              onClick={closeMenu}
            >
              Business
            </NavLink>
            <NavLink
              className="font-bold text-blue-900 hover:underline"
              to="/category/tech"
              onClick={closeMenu}
            >
              Tech
            </NavLink>
            <NavLink
              className="font-bold text-blue-900 hover:underline"
              to="/category/world"
              onClick={closeMenu}
            >
              World
            </NavLink>
            <NavLink
              className="font-bold text-blue-900 hover:underline"
              to="/category/sports"
              onClick={closeMenu}
            >
              Sports
            </NavLink>
            <NavLink
              className="font-bold text-blue-900 hover:underline"
              to="/category_subscribed"
              onClick={closeMenu}
            >
              Subscribed
            </NavLink>
            {auth.currentUser && (
              <NavLink
                className="font-bold text-blue-900 hover:underline"
                to="/create"
                onClick={closeMenu}
              >
                Publish
              </NavLink>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
