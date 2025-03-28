import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-6 shadow-md w-full h-13 bg-gradient-to-r bg-white from-blue-500 to-violet-500">
      <div className="flex items-center">
        {/* Trello Logo */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 text-white mr-2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <rect x="7" y="7" width="3" height="10" fill="currentColor" />
          <rect x="14" y="7" width="3" height="6" fill="currentColor" />
        </svg>
        <span className="text-4xl text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
          Trello

        </span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-5 text-lg text-white font-medium">
        <a href="#" className="hover:text-gray-200">Features</a>
        <a href="#" className="hover:text-gray-200">Solutions</a>
        <a href="#" className="hover:text-gray-200">Pricing</a>
        <a href="#" className="hover:text-gray-200">Resources</a>
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-x-3 sm:gap-x-5">
      
      <Link to="/signup"> 
  <button className="bg-white text-white bg-gradient-to-r from-blue-500 to-violet-500 600 px-4 py-2 font-semibold text-lg hover:bg-sky-300 border border-white rounded-full transition">
    Sign-up
  </button>
</Link>


        {/* Login button wrapped with Link */}
        <Link to="/login">
          <button className="bg-white text-white bg-gradient-to-r from-blue-500 to-violet-500 600 px-4 py-2 font-semibold text-lg hover:bg-sky-300 border border-white rounded-full transition">
            Log in
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
