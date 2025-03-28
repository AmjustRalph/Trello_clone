
import { Link } from "react-router-dom";

const Dashboard = () => {
  const boards = [
    { id: "1", title: "Project Management" },
    { id: "2", title: "Marketing Plan" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-purple-300 p-6 text-white">
      <h1 className="text-3xl font-bold">Your Boards</h1>
      <div className="grid grid-cols-3 gap-6 mt-6">
        {boards.map((board) => (
          <Link 
            key={board.id} 
            to={`/board/${board.id}`} 
            className="bg-white text-black p-4 rounded-lg shadow-lg hover:shadow-xl transition">
            <h2 className="text-xl font-bold">{board.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
