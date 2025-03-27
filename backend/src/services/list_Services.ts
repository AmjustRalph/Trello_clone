import { pool } from "../config/db_connect";
import { throwError } from "../utils/throwError";

export const createListService = async (board_id: number, name: string, position: number) => {
     // Validate data types before querying
     if (typeof board_id !== "number" || isNaN(board_id)) {
        throwError("Invalid board_id. It must be a number.",400);
    }

    if (typeof name !== "string" || name.trim() === "") {
        throwError("Invalid name. It must be a non-empty string.",400);
    }

    if (position !== undefined && (typeof position !== "number" || isNaN(position))) {
        throwError("Invalid position. It must be a number.",400);
    }

    if (position === undefined || position === null) {
      const result = await pool.query(
        "SELECT COALESCE(MAX(position), -1) + 1 AS next_position FROM lists WHERE board_id = $1",
        [board_id]
      );
      position = result.rows[0].next_position;
    }
  
    const query = `
      INSERT INTO lists (board_id, name, position) 
      VALUES ($1, $2, $3) 
      RETURNING *`;
  
    const values = [board_id, name, position];
  
    const result = await pool.query(query, values);
    return result.rows[0];
  };



export const deleteListService = async (id: number) => {
    if (typeof id !== "number" || isNaN(id)) {
        throwError("Invalid list ID. It must be a number.",400 );
    }

    const result = await pool.query("DELETE FROM lists WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
        throw { status: 404, message: "List not found." };
    }

    return { message: "List deleted successfully" };
};



export const updateListService = async (id: number, name: string) => {
    if (typeof id !== "number" || isNaN(id)) {
        throwError("Invalid list ID. It must be a number.", 400);
    }

    if (!name || typeof name !== "string" || name.trim() === "") {
        throwError("Invalid name. It must be a non-empty string.",400)
    }

    const result = await pool.query(
        "UPDATE lists SET name = $1 WHERE id = $2 RETURNING *",
        [name, id]
    );

    if (result.rowCount === 0) {
        throwError("List not found.", 404)
    }

    return result.rows[0];
};



export const reorderListsService = async (lists: { position: number; id: number }[]) => {
   
    if (!Array.isArray(lists) || lists.length === 0) {
        throwError("Invalid request. Expecting a non-empty array of lists.", 400);
    }

    try {
        for (const list of lists) {
            const id = Number(list.id);
            const position = Number(list.position);

            if (isNaN(id) || isNaN(position)) {
                throwError("Invalid list format. Each list must have a valid numeric id and position.", 400);
            }

            await pool.query("UPDATE lists SET position = $1 WHERE id = $2", [position, id]);
        }
        return { message: "Lists reordered successfully" };
    } catch (error) {
        throwError("Server Error while reordering lists", 500);
    }
};
