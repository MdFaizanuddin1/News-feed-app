import { register } from "../../redux/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSignUpButtonClick = () => {
    // console.log('button clicked');
    // Navigate to a new route
    navigate("/sign-up");
  };
  const handleSignInButtonClick = () => {
    navigate("/sign-in");
  };

  function onSubmit(e) {
    e.preventDefault();
    let userCredentials = {
      userName: userName,
      email,
      password,
    };
    // console.log("register", userCredentials);
    dispatch(register(userCredentials)).then((action) => {
      localStorage.setItem("token", action.payload.data.token);
      navigate("/");
    });
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Create an Account
        </h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            onClick={handleSignUpButtonClick}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-all"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-600 text-sm text-center mt-4">
          Already have an account?
        </p>
        <button
          type="button"
          onClick={handleSignInButtonClick}
          className="w-full mt-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold py-2 rounded-md transition-all"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUp;
