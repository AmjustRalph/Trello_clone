import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/sign-up";
import Dashboard from "./components/Dashboard"; // ✅ Import Dashboard

const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Trello</Link>
          <div className="flex gap-4">
            <Link to="/login" className="bg-white text-blue-500 px-4 py-2 rounded-md">Log in</Link>
            <Link to="/signup" className="bg-white text-blue-500 px-4 py-2 rounded-md">Sign-up</Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ Fixed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

