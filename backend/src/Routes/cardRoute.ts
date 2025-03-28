import express from "express";
import { createCardController, reorderCardsController, updateCard } from "../controllers/cardController";
import { deleteCardController } from "../controllers/cardController";

const router = express.Router();

router.patch("/", reorderCardsController);

router.post("/", createCardController)

router.delete("/:id", deleteCardController);

router.put("/:id", updateCard);





export default router;
