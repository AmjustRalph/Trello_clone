// Card.tsx
import { useState } from 'react';
import Modal from './Modal';
import { Card as CardType } from './types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { deleteCard } from './boardService';

function CardComponent({ card, listId, setBoard }: { card: CardType; listId: number, setBoard: React.Dispatch<React.SetStateAction<any>> }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: card.id.toString(),
    data: { current: { listId } },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDeleteCard = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteCard(card.id);
      setBoard((prevBoard: any) => {
        const updatedLists = prevBoard.lists.map((list: any) => {
          if (list.id === listId) {
            return { ...list, cards: list.cards.filter((item: any) => item.id !== card.id) };
          }
          return list;
        });
        return { ...prevBoard, lists: updatedLists };
      });
    } catch (err: any) {
      setError(err.message || 'Failed to delete card');
      console.error('Error deleting card:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-3 rounded-md mb-2 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <h3 className="text-sm font-semibold mb-1">{card.title}</h3>
      <p className="text-xs text-gray-600 mb-2">{card.description}</p>
      {card.imageUrl && <img src={card.imageUrl} alt="Card Image" className="max-w-full rounded-md mb-2" />}
      <div className="flex justify-end mt-2">
        <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => setIsModalOpen(true)}>
          Edit
        </button>
        <button onClick={handleDeleteCard} className="text-red-500 hover:text-red-700">Delete</button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} card={card} />
    </div>
  );
}

export default CardComponent;

