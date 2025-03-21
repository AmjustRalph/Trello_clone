const SignUp = () => {
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
  
          {/* Username Input */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Email Input */}
          <div className="mt-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Password Input */}
          <div className="mt-3">
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/* Register Button */}
          <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition">
            Register
          </button>
        </div>
      </div>
    );
  };
  
  export default SignUp;
  