import { login } from "../../redux/userSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUpButtonClick = () => {
    // console.log('button clicked');
    // Navigate to a new route
    navigate("/sign-up");
  };
  function onSubmit(e) {
    e.preventDefault();
    // console.log('login', email,password);
    let userCredentials = {
      email,
      password,
    };

    dispatch(login(userCredentials)).then((action) => {
      localStorage.setItem("token", action.payload.data.token);
    });

    navigate("/");
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Sign In to Your Account
        </h2>
        <form className="space-y-4" onSubmit={onSubmit}>
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
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-all"
          >
            Sign In
          </button>
        </form>
        <p className="text-gray-600 text-sm text-center mt-4">
          Dont have an account?
        </p>
        <button
          type="button"
          onClick={handleSignUpButtonClick}
          className="w-full mt-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold py-2 rounded-md transition-all"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignIn;
