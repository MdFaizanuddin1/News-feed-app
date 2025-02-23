// import axios from "axios";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./redux/userSlice";
import Navbar from "./components/Navbar";
const App = () => {
  // axios
  //   .get("/api/v1/healthCheck")
  //   .then((res) => {
  //     console.log("response is", res);
  //     console.log("data is ", res.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
