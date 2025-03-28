
import { useState } from "react";

const Login = () => {
 console.log("I'm here")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    console.log("Handle Login is working")
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5350/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data)
      setLoading(false);

      if (response.ok) {
        localStorage.setItem("token", data.token); // Save token
        window.location.href = "/Dashboard"; // Redirect
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        
        {/* Trello Logo + Text */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 text-blue-600"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <rect x="7" y="7" width="3" height="10" fill="currentColor" />
            <rect x="14" y="7" width="3" height="6" fill="currentColor" />
          </svg>
          <span className="text-2xl font-bold text-blue-600">Trello</span>
        </div>

        <h2 className="text-xl font-semibold text-gray-800">Log in to continue</h2>

        {/* Show error message */}
        {error && <p className="text-red-600 mt-2">{error}</p>}

        {/* Email Input */}
        <div className="mt-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mt-3">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full mt-4 py-2 rounded-md font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;

