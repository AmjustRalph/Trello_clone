import { pool } from "../config/db_connect";
import getRandomBackground from "../utils/random";
import { throwError } from "../utils/throwError";


//Get all boards
export const getBoardService = async () =>  {
    const result = await pool.query("SELECT * FROM boards ORDER BY created_at DESC");
    return  result.rows;
}


export const createBoardWithDefaultList = async (name: string, backgroundColor: string, backgroundImage: string) => {

  const bg: { background_color?: string; background_image?: string } = backgroundColor || backgroundImage ? {} : getRandomBackground();
    const boardResult = await pool.query(
      "INSERT INTO boards (name, background_color, background_image) VALUES ($1, $2, $3) RETURNING *",
      [name, bg.background_color || backgroundColor, bg.background_image || backgroundImage]
    );
    const board = boardResult.rows[0];
    return board;
 
};



//Get Already Created Board
export const getBoardWithListsAndCards = async (boardId: string) => {
  
    // Fetch the board
    const boardResult = await pool.query("SELECT * FROM boards WHERE id = $1", [boardId]);
  if (boardResult.rows.length === 0) {
    throwError(`Board with ID ${boardId} not found`, 404);
    };

    const board = boardResult.rows[0];

    // Fetch lists for the board
    const listsResult = await pool.query("SELECT * FROM lists WHERE board_id = $1", [boardId]);

    // Fetch cards for each list
    const listsWithCards = await Promise.all(
      listsResult.rows.map(async (list) => {
        const cardsResult = await pool.query("SELECT * FROM cards WHERE list_id = $1", [list.id]);
        return { ...list, cards: cardsResult.rows };
      })
    );

    return { ...board, lists: listsWithCards };
};



// Fetch a single board by ID
export const deleteService = async (id: number) => {
  const result = await pool.query("DELETE FROM boards WHERE id = $1 RETURNING *", [id]);
  return result.rowCount && result.rowCount > 0 ? result.rows[0] : null; 
};



