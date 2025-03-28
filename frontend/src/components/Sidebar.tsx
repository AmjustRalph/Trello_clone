import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 focus:outline-none text-white"
        >
          {isOpen ? "←" : "→"}
        </button>
        <nav className="mt-4">
          <Link to="/" className="block p-4 hover:bg-gray-700">🏠 Home</Link>
          <Link to="/dashboard" className="block p-4 hover:bg-gray-700">📊 Dashboard</Link>
          <Link to="/board/1" className="block p-4 hover:bg-gray-700">📌 Board</Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;


