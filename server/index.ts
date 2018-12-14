import app from "./app";
import routes from "./routes";
import mongoose from "mongoose";

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/waterboy"
);
mongoose.Promise = global.Promise;

routes(app);

app.listen(app.get("port"), () => {
  console.log(
    `* Listening at http://localhost:${app.get("port")} in ${app.get("env")}`
  );
  console.log("* Press ctrl+c to stop\n");
});
