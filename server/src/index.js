import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app, server } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    server.on("error", (error) => {
      console.log("Error", error);
      throw err;
    });
    const port = process.env.PORT || 8001;
    server.listen(port, () => {
      console.log(`⚙️ Server is running at port : ${port}`);
    });
  })
  .catch((err) => {
    console.log(`mongo db connection failed !! ${err}`);
  });
