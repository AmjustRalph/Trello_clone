// Modal.tsx
import { useState } from 'react';
import { Card as CardType } from './types';
import { updateCard } from './boardService';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  card: CardType;
}

function Modal({ isOpen, onClose, card }: ModalProps) {
  const [cardData, setCardData] = useState<CardType>(card);
  const [image, setImage] = useState<File | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    updateCard(cardData.id, cardData).then(() => {
      onClose();
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Card</h2>
        <input
          type="text"
          name="title"
          value={cardData.title}
          onChange={handleInputChange}
          className="border rounded-md p-2 w-full mb-2"
          placeholder="Title"
        />
        <textarea
          name="description"
          value={cardData.description}
          onChange={handleInputChange}
          className="border rounded-md p-2 w-full mb-2"
          placeholder="Description"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-2"
        />
        {image && (
          <img src={URL.createObjectURL(image)} alt="Preview" className="max-w-full mb-2" />
        )}
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 text-gray-500 hover:text-gray-700">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;