import { Response, Request, NextFunction } from "express";
import { createListService, deleteListService, reorderListsService, updateListService } from "../services/list_Services";
//import { createListService, deleteListService, reorderListsService, updateListService } from "../services/listServices";


export const createListController = async (req: Request, res: Response, next: NextFunction) => {
  const { board_id, name, position } = req.body;

  if (!board_id || !name) {
      res.status(400).json({ error: "Board ID and name are required" });
      return
  }

  try {
    const newList = await createListService( board_id, name, position );
    res.json(newList);
  } catch (error) {
   next(error)
  }
};



export const deleteListController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id); 
        const response = await deleteListService(id);
        res.status(200).json(response);
    } catch(err) {
        next(err)
    }

    }


export const updateListController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const { name } = req.body;
    
            if (isNaN(id)) {
                res.status(400).json({ error: "Invalid list ID. It must be a number." });
                return
            }
    
            const updatedList = await updateListService(id, name);
            res.status(200).json(updatedList);
        } catch (error) {
          next(error)
        }
};
    

export const reorderListsController = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { lists } = req.body;

        if (!Array.isArray(lists)) {
            res.status(400).json({ error: "Invalid request format. Expecting an array of lists." });
            return
        }
        const response = await reorderListsService(lists);
        res.status(200).json(response);

    } catch (error) {
      next(error);
    }
};