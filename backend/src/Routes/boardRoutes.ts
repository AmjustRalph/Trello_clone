import express from "express";
const router = express.Router();
import {createBoardController, deleteBoardController, getBoardDetails, getBoardsController } from "../controllers/board_controller";
import { validateBoards } from "../utils/validations";

// Get all boards
 router.get("/", getBoardsController);

//Create boards
 router.post("/", validateBoards, createBoardController)

//  Get a single board
router.get("/:boardId", getBoardDetails)

//  Delete a board
router.delete("/:id", deleteBoardController)


export default router;
