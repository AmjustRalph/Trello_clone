import { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import List from "./List";

const Board = () => {
  const [lists, setLists] = useState([
    { id: "1", title: "To Do", tasks: [{ id: "task-1", content: "Write report" }] },
    { id: "2", title: "In Progress", tasks: [{ id: "task-2", content: "Review PRs" }] },
    { id: "3", title: "Done", tasks: [{ id: "task-3", content: "Deploy app" }] },
  ]);

  // Function to add a new task
  const addTask = (listId: string, content: string) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: [...list.tasks, { id: `task-${Date.now()}`, content }],
            }
          : list
      )
    );
  };

  // Function to edit a task
  const updateTask = (taskId: string, newContent: string) => {
    setLists((prevLists) =>
      prevLists.map((list) => ({
        ...list,
        tasks: list.tasks.map((task) =>
          task.id === taskId ? { ...task, content: newContent } : task
        ),
      }))
    );
  };

  // Function to add a new board (list)
  const addBoard = () => {
    const newBoard = {
      id: `list-${Date.now()}`,
      title: `New Board`,
      tasks: [],
    };
    setLists([...lists, newBoard]);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setLists((prevLists) => {
      let newLists = [...prevLists];

      // Handling list dragging
      const oldIndex = prevLists.findIndex((list) => list.id === active.id);
      const newIndex = prevLists.findIndex((list) => list.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        return arrayMove(prevLists, oldIndex, newIndex);
      }

      // Handling task dragging
      let sourceList = newLists.find((list) => list.tasks.some((task) => task.id === active.id));
      let destList = newLists.find((list) => list.tasks.some((task) => task.id === over.id)) || 
                     newLists.find((list) => list.id === over.id);

      if (!sourceList || !destList) return prevLists;

      const taskIndex = sourceList.tasks.findIndex((task) => task.id === active.id);
      const [movedTask] = sourceList.tasks.splice(taskIndex, 1);

      destList.tasks.push(movedTask);

      return newLists;
    });
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-60 bg-gray-800 text-white p-4 hidden md:block">
        <h2 className="text-xl font-bold">Sidebar</h2>
      </div>

      {/* Board Content */}
      <div className="min-h-screen p-6 bg-gray-100 flex-grow">
        <button 
          className="mb-4 p-2 bg-green-500 text-white rounded"
          onClick={addBoard}
        >
          + Add Board
        </button>

        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <SortableContext items={lists.map((list) => list.id)}>
            <div className="flex gap-4 overflow-x-auto">
              {lists.map((list) => (
                <List 
                  key={list.id} 
                  id={list.id} 
                  title={list.title} 
                  tasks={list.tasks} 
                  addTask={addTask} 
                  updateTask={updateTask}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default Board;



