import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

interface CardProps {
  id: string;
  content: string;
  updateTask: (id: string, newContent: string) => void;
}

const Card: React.FC<CardProps> = ({ id, content, updateTask }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(content);

  const handleBlur = () => {
    setIsEditing(false);
    updateTask(id, newContent);
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-2 bg-blue-500 text-white rounded shadow cursor-pointer"
      style={{
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
      }}
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <input
          className="w-full p-1 text-black rounded"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === "Enter" && handleBlur()}
          autoFocus
        />
      ) : (
        <span>{content}</span>
      )}
    </div>
  );
};

export default Card;

