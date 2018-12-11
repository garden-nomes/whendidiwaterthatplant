import boards from "./controllers/boards";
import { Router } from "express";

export default (routes: Router) => {
  routes.route("/api/boards").post(boards.post);

  routes
    .route("/api/boards/:key")
    .get(boards.get)
    .put(boards.updateBoard);
};
