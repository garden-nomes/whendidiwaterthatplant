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
  getById: (req: Request, res: Response) => {
    Board.findById(req.params.id, (err, board) => {
      if (err) res.send(err);
      res.json(board);
    });
  },
  updateBoard: (req: Request, res: Response) => {
    console.log([req.params, req.body]);
    Board.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, board) => {
        if (err) res.send(err);
        res.json(board);
      }
    );
  }
};
