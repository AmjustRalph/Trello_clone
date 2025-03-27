import express from "express";
import { createCardController, reorderCardsController, updateCard } from "../controllers/cardController";
import { deleteCardController } from "../controllers/cardController";

const router = express.Router();

router.put("/reorder", reorderCardsController);

router.post("/createCard", createCardController)

router.put("/update/:id", updateCard)

router.delete("/delete/:id", deleteCardController);



export default router;
