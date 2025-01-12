import mongoose from "mongoose";

export default function dbConnection() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/socket")
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log("db ERROR 🚩 " + err);
    });
}
