// import express from "express";
// import { Pool } from "pg";
// const router = express.Router();

// // Create a board
// router.post("/", async (req, res) => {
//   try {
//     const { name } = req.body;
//     const newBoard = await pool.query(
//       "INSERT INTO boards (name) VALUES ($1) RETURNING *",
//       [name]
//     );
//     res.json(newBoard.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });




// router.post("/createBoard", createBoard)

// // Get all boards
// router.get("/", async (req, res) => {
//   try {
//     const boards = await pool.query("SELECT * FROM boards");
//     res.json(boards.rows);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// // Get a single board
// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const board = await pool.query("SELECT * FROM boards WHERE id = $1", [id]);
//     res.json(board.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// // Delete a board
// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await pool.query("DELETE FROM boards WHERE id = $1", [id]);
//     res.json({ message: "Board deleted successfully" });
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// module.exports = router;
