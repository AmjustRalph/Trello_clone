

import { pool } from "../config/db_connect";

export const createCard = async (list_id: number, description: string, position: number) => {
  const query = `
    INSERT INTO cards (list_id, description, position) 
    VALUES ($1, $2, $3) 
    RETURNING *`;
    
  const values = [list_id, description, position];

    const result = await pool.query(query, values);
  return result.rows[0];
};

export const deleteCardById = async (id: number) => {
    return pool.query("DELETE FROM cards WHERE id = $1", [id]);
  };
  
export const updateCardById = async (id: number, description: string) => {
    return pool.query(
      "UPDATE cards SET description = $1 WHERE id = $2 RETURNING *",
      [description, id]
    );
  };


  export const reorderCards = async (cards: { id: number; position: number; list_id: number }[]) => {
      for (const card of cards) {
        await pool.query(
          "UPDATE cards SET position = $1, list_id = $2 WHERE id = $3",
          [card.position, card.list_id, card.id]
        );
      }

  };