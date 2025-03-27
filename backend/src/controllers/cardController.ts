
import {Request, Response, NextFunction } from "express";
import { createCard, deleteCardById, reorderCards, updateCardById } from "../services/cardServices";
import { pool } from "../config/db_connect";


export const createCardController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { list_id, description, position } = req.body;
  
      if (!list_id || !description) {
          res.status(400).json({ error: "List ID and description are required" });
          return
      }
  
      const newCard = await createCard(list_id, description, position);
       res.status(201).json(newCard);
    } catch (error) {
      next(error)
    }
};
  


export const deleteCardController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
  
    // Validate ID
    if (!id || isNaN(Number(id))) {
        res.status(400).json({ error: "Invalid card ID" });
        return
    }
  
    try {
      const result = await deleteCardById(Number(id));
  
      if (result.rowCount === 0) {
          res.status(404).json({ error: "Card not found" });
          return
      }
  
      res.json({ message: "Card deleted successfully" });
    } catch (error) {
     next(error)
    }
};
  

export const updateCard = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const {description } = req.body;

  // Validate input
  if (!id || isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid card ID" });
      return
  }
    
  if (!description || typeof description !== "string") {
      res.status(400).json({ error: "Description is required and must be a string" });
      return
  }

  try {
    const result = await updateCardById(Number(id), description);

    if (result.rowCount === 0) {
        res.status(404).json({ error: "Card not found" });
        return
    }

    res.json(result.rows[0]);
  } catch (error) {
   next(error)
  }
};


export const reorderCardsController = async (req: Request, res: Response, next: NextFunction) => {
    const { cards } = req.body;
  
    // Validate input
    if (!Array.isArray(cards) || cards.length === 0) {
        res.status(400).json({ error: "Invalid input: Must provide an array of cards" });
        return
    }
  
    for (const card of cards) {
      if (!card.id || typeof card.id !== "number") {
          res.status(400).json({ error: `Invalid card ID: ${card.id}` });
          return
      }
      if (typeof card.position !== "number") {
          res.status(400).json({ error: `Invalid position for card ${card.id}` });
          return
      }
      if (!card.list_id || typeof card.list_id !== "number") {
          res.status(400).json({ error: `Invalid list_id for card ${card.id}` });
          return
      }
    }
  
    try {
      await reorderCards(cards);
      res.json({ message: "Cards reordered successfully" });
    } catch (error) {
    next(error)
    }
  };
