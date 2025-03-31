import { Response, Request, NextFunction } from "express";
import { throwError } from "../utils/throwError";
import { pool } from "../config/db_connect";
import handleResponse from "../utils/ResponseHandler";
import { deleteEntity } from "../utils/deleteEntity";



export const createListController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { board_id, name, position } = req.body;
        if (!board_id || typeof board_id !== "number") throwError("Invalid board_id.", 400);
        if (!name || typeof name !== "string" || !name.trim()) throwError("Invalid name.", 400);

        const { rows } = await pool.query(
            `INSERT INTO lists (board_id, name, position) 
             VALUES ($1, $2, COALESCE($3, (SELECT COALESCE(MAX(position), 0) + 1 FROM lists WHERE board_id = $1))) 
             RETURNING *`,
            [board_id, name, position]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        next(error);
    }
};




export const reorderListsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lists: { id: number; position: number }[] = req.body?.lists;

        if (!Array.isArray(lists) || lists.some(({ id, position }) => isNaN(id) || isNaN(position))) {
            throwError("Invalid request. Each list must have a numeric 'id' and 'position'.", 400);
        }

        await Promise.all(
            lists.map(({ id, position }) => pool.query("UPDATE lists SET position = $1 WHERE id = $2", [position, id]))
        );

        handleResponse(res, 200, "Lists reordered successfully")
    } catch (error) {
        next(error);
    }
};




export const deleteListController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id); 
        const response = await deleteEntity("lists", id, "List");
        handleResponse(res, 200, "List deleted successfully", response)
    } catch(err) {
        next(err)
    }

    }


    export const updateListController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const { name } = req.body;
    
            if (!id || isNaN(id) || !name?.trim()) throwError("Invalid input. ID must be a number, and name cannot be empty.", 400);
    
            const { rowCount, rows } = await pool.query(
                "UPDATE lists SET name = $1 WHERE id = $2 RETURNING *", [name.trim(), id]
            );
    
            if (!rowCount) throwError("List not found.", 404);
    
            handleResponse(res, 200, "List updated successfully", rows[0])

        } catch (error) {
            next(error);
        }
    };
    
    
