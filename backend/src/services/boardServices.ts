// import { pool } from "../config/db_connect";
// import { throwError } from "../utils/throwError";


// const createBoard = async (name: string) => {
//    try{
//     const newBoard = await pool.query(
//       "INSERT INTO boards (name) VALUES ($1) RETURNING *",
//       [name]
//     );
//        return newBoard.rows[0];
//    } catch (err) {
//     throwError("Failed to create board", 400);
//    }

//   };
  


// const services = {
//       createBoard,
//   }
// export { services }