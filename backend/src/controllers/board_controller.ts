// import { Request, Response, NextFunction } from "express";
// import { services } from "../services/boardServices";

// const createBoard = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { name } = req.body;

//     // Validate input
//     if (!name || name.trim() === "") {
//       return res.status(400).json({ error: "Board name is required" });
//     }

//     // Call service to create the board
//     const board = await services.createBoard(name);

//     res.status(201).json(board);
//   } catch (err) {
//     next(err)
//   }
// };

// module.exports = { createBoard };



