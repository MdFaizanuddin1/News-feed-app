import mongoose from "mongoose";

const connectDB = async () => {
  const DB_NAME = "Agumentik_Assignment"
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n mongodb connected !! DB Host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("mongodb connection Failed", error);
    process.exit(1);
  }
};

export default connectDB