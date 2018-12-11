import mongoose from "mongoose";
import { Request, Response } from "express";
import BoardSchema from "../models/board";

const Board = mongoose.model("Board", BoardSchema);

export default {
  post: (req: Request, res: Response) => {
    const board = new Board(req.body);

    board.save((err, board) => {
      if (err) res.send(err);
      res.json(board);
    });
  },
  get: (req: Request, res: Response) => {
    Board.find({ key: req.params.key }, (err, board) => {
      if (err) res.send(err);
      res.json(board);
    });
  },
  updateBoard: (req: Request, res: Response) => {
    Board.findOneAndUpdate(
      { key: req.params.key },
      req.body,
      { new: true },
      (err, board) => {
        if (err) res.send(err);
        res.json(board);
      }
    );
  }
};
