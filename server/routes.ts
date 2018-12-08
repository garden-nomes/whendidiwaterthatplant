import boards from "./controllers/boards";
import { Router } from "express";

export default (routes: Router) => {
  routes.route("/boards").post(boards.post);

  routes
    .route("/boards/:id")
    .get(boards.getById)
    .put(boards.updateBoard);

  return routes;
};
