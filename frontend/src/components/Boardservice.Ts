// Boardservice.Ts
import axios from 'axios';
import { BASE_URL } from "./apiconfig";
import { authHeader } from "./authservice";
import { Board, List, Card } from './types';

export const getBoards = async (): Promise<Board[]> => {
  try {
    const header = authHeader();
    console.log("Auth Header (getBoards):", header); // Debugging line
    const response = await axios.get(`${BASE_URL}/boards`, { headers: header });
    return response.data as Board[];
  } catch (error: any) {
    console.error('API Error (getBoards):', error);
    throw error;
  }
};

export const getBoard = async (boardId: number): Promise<Board> => {
  try {
    const header = authHeader();
    console.log("Auth Header (getBoard):", header); // Debugging line
    const response = await axios.get(`${BASE_URL}/boards/${boardId}`, { headers: header });
    return response.data as Board;
  } catch (error: any) {
    console.error(`API Error (getBoard, id: ${boardId}):`, error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw new Error('Failed to fetch board. Please try again.');
  }
};

export const createBoard = async (boardData: { title: string }): Promise<Board> => {
  try {
    const header = authHeader();
    console.log("Auth Header (createBoard):", header); // Debugging line
    const response = await axios.post(`${BASE_URL}/boards`, boardData, { headers: header });
    return response.data as Board;
  } catch (error: any) {
    console.error('API Error (createBoard):', error);
    throw error;
  }
};

export const updateBoard = async (boardId: number, boardData: { title: string }): Promise<Board> => {
  try {
    const header = authHeader();
    console.log("Auth Header (updateBoard):", header); // Debugging line
    const response = await axios.put(`${BASE_URL}/boards/${boardId}`, boardData, { headers: header });
    return response.data as Board;
  } catch (error: any) {
    console.error('API Error (updateBoard):', error);
    throw error;
  }
};

export const deleteBoard = async (boardId: number): Promise<void> => {
  try {
    const header = authHeader();
    console.log("Auth Header (deleteBoard):", header); // Debugging line
    await axios.delete(`${BASE_URL}/boards/${boardId}`, { headers: header });
  } catch (error: any) {
    console.error('API Error (deleteBoard):', error);
    throw error;
  }
};

export const getList = async (listId: number): Promise<List> => {
  try {
    const header = authHeader();
    console.log("Auth Header (getList):", header); // Debugging line
    const response = await axios.get(`${BASE_URL}/lists/${listId}`, { headers: header });
    return response.data as List;
  } catch (error: any) {
    console.error('API Error (getList):', error);
    throw error;
  }
};

export const createList = async (listData: { title: string; boardId: number }): Promise<List> => {
  try {
    const header = authHeader();
    console.log("Auth Header (createList):", header); // Debugging line
    const response = await axios.post(`${BASE_URL}/lists`, listData, { headers: header });
    return response.data as List;
  } catch (error: any) {
    console.error('API Error (createList):', error);
    throw error;
  }
};

export const updateList = async (listId: number, listData: { title: string }): Promise<List> => {
  try {
    const header = authHeader();
    console.log("Auth Header (updateList):", header); // Debugging line
    const response = await axios.put(`${BASE_URL}/lists/${listId}`, listData, { headers: header });
    return response.data as List;
  } catch (error: any) {
    console.error('API Error (updateList):', error);
    throw error;
  }
};

export const deleteList = async (listId: number): Promise<void> => {
  try {
    const header = authHeader();
    console.log("Auth Header (deleteList):", header); // Debugging line
    await axios.delete(`${BASE_URL}/lists/${listId}`, { headers: header });
  } catch (error: any) {
    console.error('API Error (deleteList):', error);
    throw error;
  }
};

export const getCard = async (cardId: string): Promise<Card> => {
  try {
    const header = authHeader();
    console.log("Auth Header (getCard):", header); // Debugging line
    const response = await axios.get(`${BASE_URL}/cards/${cardId}`, { headers: header });
    return response.data as Card;
  } catch (error: any) {
    console.error('API Error (getCard):', error);
    throw error;
  }
};

export const createCard = async (cardData: { title: string; description: string; listId: number }): Promise<Card> => {
  try {
    const header = authHeader();
    console.log("Auth Header (createCard):", header); // Debugging line
    const response = await axios.post(`${BASE_URL}/cards`, cardData, { headers: header });
    return response.data as Card;
  } catch (error: any) {
    console.error('API Error (createCard):', error);
    throw error;
  }
};

export const updateCard = async (cardId: string, cardData: { title: string; description: string }): Promise<Card> => {
  try {
    const header = authHeader();
    console.log("Auth Header (updateCard):", header); // Debugging line
    const response = await axios.put(`${BASE_URL}/cards/${cardId}`, cardData, { headers: header });
    return response.data as Card;
  } catch (error: any) {
    console.error('API Error (updateCard):', error);
    throw error;
  }
};

export const deleteCard = async (cardId: string): Promise<void> => {
  try {
    const header = authHeader();
    console.log("Auth Header (deleteCard):", header); // Debugging line
    await axios.delete(`${BASE_URL}/cards/${cardId}`, { headers: header });
  } catch (error: any) {
    console.error('API Error (deleteCard):', error);
    throw error;
  }
};

export const updateCardPosition = async (cardId: string, position: number): Promise<Card> => {
  try {
    const header = authHeader();
    console.log("Auth Header (updateCardPosition):", header); // Debugging line
    const response = await axios.put(`${BASE_URL}/cards/${cardId}/position`, { position }, { headers: header });
    return response.data as Card;
  } catch (error: any) {
    console.error('API Error (updateCardPosition):', error);
    throw error;
  }
};

export const moveCardToList = async (cardId: string, listId: number, position: number): Promise<Card> => {
  try {
    const header = authHeader();
    console.log("Auth Header (moveCardToList):", header); // Debugging line
    const response = await axios.put(`${BASE_URL}/cards/${cardId}/list`, { listId, position }, { headers: header });
    return response.data as Card;
  } catch (error: any) {
    console.error('API Error (moveCardToList):', error);
    throw error;
  }
};