
import express from "express";
import { createListController, deleteListController, reorderListsController, updateListController } from "../controllers/List_controller";


const router = express.Router();

router.post("/", createListController);

router.patch("/", reorderListsController);

router.delete("/:id", deleteListController);

router.put("/:id", updateListController);



export default router;

