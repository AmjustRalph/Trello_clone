// Board.tsx
import { useState, useEffect } from 'react';
import type { Board, List as ListType, Card as CardType } from './types';
import { getBoards, getBoard, updateBoard } from './boardService';
import List from './List';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core';


// export type Board = {
//   id: number;
//   name: string;
//   background_color: string | null;
//   background_image: string | null;
//   created_at: string;
// };

// export type GetBoardsResponse = {
//   status: number;
//   message: string;
//   data: Board[];
// };



// function Board() {
//   const [boards, setBoards] = useState<GetBoardsResponse | null>(null);
//   useEffect(() => {
//          const fetchBoardData = async () => {
//          try {
//             const boardsData = await getBoards();
//            console.log('Fetched boards:', boardsData);
//            setBoards(boardsData);
//           } catch (err) {
//             console.error('Error fetching board data:', err);
//           } 
//         };
//         fetchBoardData();
//       }, []);
//   return (
//     <div>
//       <h1>Hello World</h1>
//       {boards?.data ? (
//         boards.data.map((board) => (
//           <div key={board.id}>
//             <h2>{board.name}</h2>
//              <p>{board.background_color}</p>
//             <p>{board.background_image}</p>
//             <p>{board.created_at}</p> 
//           </div>
//         ))
//       ) : (
//         <div className="flex justify-center items-center h-screen">Loading...</div>
//       )
//       }</div>
//   )
// }
 //export default Board;
 function Board() {
   const [boards, setBoards] = useState<Board[]>([]);
   const [board, setBoard] = useState<Board | null>(null);
   const [editingBoardId, setEditingBoardId] = useState<number | null>(null);
   const [editedBoardTitle, setEditedBoardTitle] = useState('');
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);


   useEffect(() => {
     const fetchBoardData = async () => {
       setLoading(true);
        setError(null);
      try {
         const boardsData = await getBoards();
         console.log('Fetched boards:', boardsData);
          setBoards([boardsData]);
          const boardData = await getBoard(1);
         setBoard(boardData);
       } catch (err) {
         setError(err instanceof Error ? (err.message || 'Failed to fetch board data') : 'Failed to fetch board data');
         console.error('Error fetching board data:', err);
       } finally {
         setLoading(false);
       }
     };
     fetchBoardData();
   }, []);
  

 const handleEditBoard = (boardId: number, title: string) => {
   setEditingBoardId(boardId);
   setEditedBoardTitle(title);
 };

   const handleUpdateBoard = async () => {
     if (editingBoardId) {
       setLoading(true);
       setError(null);
       try {
         const updatedBoard = await updateBoard(editingBoardId, { title: editedBoardTitle });
         setBoards((prevBoards) =>
           prevBoards.map((board) =>
             board.id === updatedBoard.id ? updatedBoard : board
           )
         );
         setEditingBoardId(null);
       } catch (err) {
         setError(err instanceof Error ? (err.message) : 'Failed to update board');
         console.error('Error updating board:', err);
       } finally {
         setLoading(false);
       }
     }
   };

   const handleCancelEdit = () => {
     setEditingBoardId(null);
     setEditedBoardTitle('');
   };


   const handleDragEnd = (event: DragEndEvent) => {
     const { active, over } = event;
     if (!over) return;
     if (active.id !== over.id) {
       const activeId = active.id.toString();
       const overId = over.id.toString();
       const activeListId = active.data.current?.listId.toString();
       const overListId = over.data.current?.listId.toString();
       setBoard((prevBoard: Board | null) => {
         if (!prevBoard) return prevBoard;
         let updatedLists = [...prevBoard.lists];
         if (activeListId === overListId) {
           updatedLists = updatedLists.map((list: ListType) => {
             if (list.id.toString() === activeListId) {
               const activeIndex = list.cards.findIndex((card: CardType) => card.id.toString() === activeId);
               const overIndex = list.cards.findIndex((card: CardType) => card.id.toString() === overId);
               const newCards = arrayMove(list.cards, activeIndex, overIndex);
               return { ...list, cards: newCards };
             }
             return list;
           });
         } else {
         const activeListIndex: number = updatedLists.findIndex(list => list.id.toString() === activeListId);
         const activeCard: CardType | undefined = updatedLists[activeListIndex]?.cards.find(card => card.id.toString() === activeId);
         const overListIndex: number = updatedLists.findIndex(list => list.id.toString() === overListId);
           if (activeCard) {
             updatedLists[activeListIndex] = {
               ...updatedLists[activeListIndex],
               cards: updatedLists[activeListIndex].cards.filter(card => card.id.toString() !== activeId),
             };
             const overIndex = updatedLists[overListIndex].cards.findIndex(card => card.id.toString() === overId);
             updatedLists[overListIndex] = {
               ...updatedLists[overListIndex],
               cards: [...updatedLists[overListIndex].cards.slice(0, overIndex), activeCard, ...updatedLists[overListIndex].cards.slice(overIndex)],
             };
           }
         }
         return { ...prevBoard, lists: updatedLists };
       });
     }
   };

   if (loading) {
     return <div className="flex justify-center items-center h-screen">Loading...</div>;
   }
   if (error) {
     return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
   }
   if (!boards) {
     return <div className="flex justify-center items-center h-screen">No board found.</div>;
   }

   return (
     <div>
       <div>
         {boards.map((board) => (
           <div key={board.id}>
             {editingBoardId === board.id ? (
               <div>
                 <input
                   type="text"
                   value={editedBoardTitle}
                   onChange={(e) => setEditedBoardTitle(e.target.value)}
                 />
                 <button onClick={handleUpdateBoard}>Save</button>
                 <button onClick={handleCancelEdit}>Cancel</button>
               </div>
             ) : (
               <div>
                 {board.title}
                 <button onClick={() => handleEditBoard(board.id, board.title)}>
                   Edit
                 </button>
               </div>
             )}
           </div>
         ))}
       </div>
       <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
         <div className="flex flex-row space-x-4 p-6 overflow-x-auto">
           {board?.lists.map((list: ListType) => (
             <SortableContext key={list.id} items={list.cards.map((card: CardType) => card.id)} strategy={verticalListSortingStrategy}>
               <List key={list.id} list={list} setBoard={setBoard} />
             </SortableContext>
           ))}
           <button className="bg-gray-200 p-4 rounded-md w-80 flex-shrink-0">Add List</button>
         </div>
       </DndContext>
     </div>
   );
 }
 export default Board;



