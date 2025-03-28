import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import Card from "./Card";

interface ListProps {
  id: string;
  title: string;
  tasks: { id: string; content: string }[];
  addTask: (listId: string, content: string) => void;
  updateTask: (taskId: string, newContent: string) => void;
}

const List: React.FC<ListProps> = ({ id, title, tasks, addTask, updateTask }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="p-4 bg-white shadow rounded w-64">
      <h2 className="text-lg font-bold mb-2">{title}</h2>

      <SortableContext items={tasks.map(task => task.id)}>
        <div className="space-y-2">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <Card
                key={task.id}
                id={task.id}
                content={task.content}
                updateTask={updateTask} // Ensure it's passed
              />
            ))
          ) : (
            <p className="text-gray-400 text-sm italic">No tasks yet...</p>
          )}
        </div>
      </SortableContext>

      <button
        className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
        onClick={() => addTask(id, `New Task ${Date.now()}`)}
      >
        + Add Card
      </button>
    </div>
  );
};

export default List;
