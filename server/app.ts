import path from "path";
import express from "express";
import morgan from "morgan";

const app = express();

app.set("port", process.env.PORT || 3000);

// const buildPath = path.join(__dirname, "..", "dist");
// app.use(express.static(buildPath));

app.use(morgan("combined"));

app.get("/api", (req, res) => {
  res.send({ message: "hello" });
});

export default app;
