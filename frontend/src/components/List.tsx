// List.tsx
import React, { useState } from 'react';
import Card from './Card';
import { List, Card as CardType } from './types';
import { useDroppable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { createCard, deleteList, updateList } from './boardService';

function ListComponent({ list, setBoard }: { list: List, setBoard: React.Dispatch<React.SetStateAction<any>> }) {
  const { setNodeRef } = useDroppable({ id: list.id.toString() });
  const { isOver } = useSortable({ id: list.id.toString() });

  const [editingList, setEditingList] = useState(false);
  const [editedTitle, setEditedTitle] = useState(list.title);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const style = {
    backgroundColor: isOver ? 'rgba(0,0,0,0.1)' : undefined,
  };

  const handleCreateCard = async () => {
    setLoading(true);
    setError(null);
    try {
      const newCard = await createCard({ title: 'new card', description: 'description', listId: list.id });
      setBoard((prevBoard: any) => ({
        ...prevBoard,
        lists: prevBoard.lists.map((l: any) =>
          l.id === list.id ? { ...l, cards: [...l.cards, newCard] } : l
        ),
      }));
    } catch (err: any) {
      setError(err.message || 'Failed to create card');
      console.error('Error creating card:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteList = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteList(list.id);
      setBoard((prevBoard: any) => ({
        ...prevBoard,
        lists: prevBoard.lists.filter((item: any) => item.id !== list.id),
      }));
    } catch (err: any) {
      setError(err.message || 'Failed to delete list');
      console.error('Error deleting list:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditList = () => {
    setEditingList(true);
  };

  const handleUpdateList = async () => {
    setLoading(true);
    setError(null);
    try {
      const updatedList = await updateList(list.id, { title: editedTitle });
      setBoard((prevBoard: any) => ({
        ...prevBoard,
        lists: prevBoard.lists.map((item: any) =>
          item.id === updatedList.id ? updatedList : item
        ),
      }));
      setEditingList(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update list');
      console.error('Error updating list:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingList(false);
    setEditedTitle(list.title);
  };

  if (loading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div ref={setNodeRef} style={style} className="bg-gray-100 p-4 rounded-md w-80 flex-shrink-0">
      {editingList ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button onClick={handleUpdateList}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-4">{list.title}</h2>
          <button onClick={handleEditList}>Edit</button>
        </div>
      )}
      <button onClick={handleDeleteList}>Delete List</button>
      {list.cards.map((card: CardType) => (
        <Card key={card.id} card={card} listId={list.id} setBoard={setBoard} />
      ))}
      <button onClick={handleCreateCard} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md w-full">
        Add Card
      </button>
    </div>
  );
}

export default ListComponent;