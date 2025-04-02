import { useState } from "react";

const SignUp = () => {
  console.log("Hello")
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);



  const handleSignUp = async (e: React.FormEvent) => {
    console.log("password type")
    console.log("Password Type:", typeof password); // Should log "string"
    console.log("Password Value:", password);

    e.preventDefault();
    setError("");
    // console.log(typeof password)
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    console.log("Reached Here")
    try {
      const response = await fetch("http://localhost:5950/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await response.json();
      console.log("This is the results from our fetch register:", data)

      if (!response.ok) {
        throw new Error(data.message || "Signup failed"); 
      } 
        localStorage.setItem("token", data.token); // Save token
        window.location.href = "/dashboard"; // Redirect
    
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
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

        <h2 className="text-xl font-semibold text-gray-800">Create an account</h2>

        {/* Show error message */}
        {error && <p className="text-red-600 mt-2">{error}</p>}

        {/* Username Input */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mt-3">
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

        {/* Re-enter Password Input */}
        <div className="mt-3">
          <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Register Button */}
        <button
          onClick={handleSignUp}
          disabled={loading}
          className={`w-full mt-4 py-2 rounded-md font-medium transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Signing up..." : "Register"}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
