import axios from "axios";

export default {
  boards: {
    post: (board: object = {}) => axios.post("/api/boards", board),
    get: (key: string) => axios.get("/api/boards/" + key),
    put: (key: string, board: object) => axios.put("/api/boards/" + key, board)
  }
};
