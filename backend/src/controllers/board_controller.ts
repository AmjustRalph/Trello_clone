import { Request, Response, NextFunction } from "express";
import {createBoardWithDefaultList, getBoardService, deleteService, getBoardWithListsAndCards} from "../services/boardServices"
import handleResponse from "../utils/ResponseHandler";



export const getBoardsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const boards = await getBoardService();
    handleResponse(res, 201, "Boards fetched Successfully", boards)
  } catch (err) {
    next(err)
  }
};


export const createBoardController = async (req: Request, res: Response, next: NextFunction) => {
  const { name, background_color, background_image } = req.body;

  try {
    const board = await createBoardWithDefaultList(name, background_color, background_image);
    res.status(201).json(board);
  } catch (error) {
   next(error)
  }
};




export const getBoardDetails = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { boardId } = req.params;

    if (isNaN(Number(boardId))) {
      res.status(400).json({ error: "Invalid list ID. It must be a number." });
      return
  }
    const boardData = await getBoardWithListsAndCards(boardId);
    
    if (!boardData) {
      res.status(404).json({ error: "Board not found" });
      return
    }

    res.json(boardData);
  } catch (error) {
    next(error)
  }
};



export const deleteController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    if (isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid list ID. It must be a number." });
      return
  }
    const deletedBoard = await deleteService(Number(id));
   
    if (!deletedBoard) {
    res.status(404).json({ error: "Board not found" });
      return
   }
    res.json({ message: "Board deleted successfully", deletedBoard });

  } catch (err) {
    next(err)
   
  }
};







