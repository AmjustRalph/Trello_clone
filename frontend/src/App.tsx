import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import SignUp from "./components/sign-up";
import Dashboard from "./components/dashboard";
import Navbar from "./components/Navbar";
import Board from "./components/Board";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/board/:id" element={<Board />} />
      </Routes>
    </>
  );
};

export default App;

