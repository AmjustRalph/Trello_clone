import { Request, Response, NextFunction } from "express";
import handleResponse from "../utils/ResponseHandler";
import { throwError } from "../utils/throwError";
import { pool } from "../config/db_connect";
import getRandomBackground from "../utils/random";
import { deleteEntity } from "../utils/deleteEntity";




  export const getBoardsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { rows } = await pool.query("SELECT * FROM boards ORDER BY created_at DESC");
      handleResponse(res, 201, "Boards fetched Successfully", rows);
    } catch (err) {
      next(err);
    }
  };
  

export const createBoardController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { name, background_color, background_image } = req.body;

    if (!background_color && !background_image) {
      ({ background_color, background_image } = getRandomBackground());
    }

    const { rows } = await pool.query(
      "INSERT INTO boards (name, background_color, background_image) VALUES ($1, $2, $3) RETURNING *",
      [name, background_color || null, background_image || null]
    );

    handleResponse(res, 201, "Board Created Successfully", rows[0]);
  } catch (error) {
    next(error);
  }
};


export const getBoardDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const boardId = Number(req.params.boardId);
    if (isNaN(boardId)) throwError("Invalid board ID. It must be a number.", 400);

    
    const { rows: boardRows } = await pool.query("SELECT * FROM boards WHERE id = $1", [boardId]);
    if (!boardRows.length) throwError("Board not found", 404);
    const board = boardRows[0];

    const { rows: lists } = await pool.query("SELECT * FROM lists WHERE board_id = $1", [boardId]);

    const listsWithCards = await Promise.all(
      lists.map(async ({ id, ...list }) => {
        const { rows: cards } = await pool.query("SELECT * FROM cards WHERE list_id = $1", [id]);
        return { ...list, id, cards };
      })
    );

    res.status(200).json({ ...board, lists: listsWithCards });
  } catch (error) {
    next(error);
  }
};


export const deleteBoardController = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const boardId = Number(req.params.id);
      if (isNaN(boardId)) throwError("Invalid board ID", 400);

      const board = await deleteEntity("boards", boardId, "Board");
      handleResponse(res, 200, "Board deleted successfully", board);
  } catch (error) {
      next(error);
  }
};

 







