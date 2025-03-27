
import express from "express";
import { createListController, deleteListController, reorderListsController, updateListController } from "../controllers/list_controller";


const router = express.Router();

router.put("/reorder", reorderListsController);

router.post("/createlist", createListController);

router.delete("/delete/:id", deleteListController);

router.put("/update/:id", updateListController);



export default router;

