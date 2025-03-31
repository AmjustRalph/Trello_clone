
import {Request, Response, NextFunction } from "express";
import { throwError } from "../utils/throwError";
import { pool } from "../config/db_connect";
import handleResponse from "../utils/ResponseHandler";
import { deleteEntity } from "../utils/deleteEntity";



export const reorderCardsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const { cards } = req.body;

      if (!Array.isArray(cards) || cards.some(({ id, position, list_id }) => [id, position, list_id].some(n => isNaN(n)))) {
          throwError("Invalid input: Each card must have a valid numeric id, position, and list_id.", 400);
      }

      await Promise.all(cards.map(({ id, position, list_id }: { id: number; position: number; list_id: number }) => 
          pool.query("UPDATE cards SET position = $1, list_id = $2 WHERE id = $3", [position, list_id, id])
      ));

    handleResponse(res, 200, "Cards reorderd successfully")
  } catch (error) {
      next(error);
  }
};



export const createCardController = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const { list_id, description, position } = req.body;
      if (!list_id || !description) throwError("List ID and description are required", 400);

      const { rows } = await pool.query(
          "INSERT INTO cards (list_id, description, position) VALUES ($1, $2, $3) RETURNING *",
          [list_id, description, position]
      );

    handleResponse(res, 201, "Card created successfully", rows[0])
  } catch (error) {
      next(error);
  }
};


export const deleteCardController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id); 
    console.log(id)
      const response = await deleteEntity("cards", id, "Card");
      handleResponse(res, 200, "Card deleted successfully", response)
  } catch(err) {
      next(err)
  }

  }


  export const updateCard = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const { description } = req.body;

        if (!id || isNaN(id)) throwError("Invalid card ID", 400);
        if (!description || typeof description !== "string") throwError("Description is required and must be a string", 400);

        const { rowCount, rows } = await pool.query(
            "UPDATE cards SET description = $1 WHERE id = $2 RETURNING *",
            [description, id]
        );

        if (!rowCount) throwError("Card not found", 404);
        res.json(rows[0]);
    } catch (error) {
        next(error);
    }
};


