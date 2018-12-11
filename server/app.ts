import path from "path";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();

app.set("port", process.env.PORT || 3000);

const buildPath = path.join(__dirname, "..", "..", "dist");
app.use(express.static(buildPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan("combined"));

export default app;
