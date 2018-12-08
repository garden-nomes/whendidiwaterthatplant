import boards from "./controllers/boards";
import { Router } from "express";

export default (routes: Router) => {
  routes.route("/api/boards").post(boards.post);

  routes
    .route("/api/boards/:id")
    .get(boards.getById)
    .put(boards.updateBoard);
};
