import express from "express";
const router = express.Router();
import {createBoardController, deleteController, getBoardDetails, getBoardsController } from "../controllers/board_controller";
import { validateBoards } from "../middleware/validateBoards";


// Get all boards
 router.get("/getAllBoards", getBoardsController);

//Create boards
 router.post("/createBoard", validateBoards, createBoardController)


//  Get a single board
router.get("/:boardId", getBoardDetails)


//  Delete a board
router.delete("/:id", deleteController)




export default router;
