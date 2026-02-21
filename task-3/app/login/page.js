export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-green-100 to-red-100 rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Login
        </h1>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Sign In
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account? <span className="text-indigo-600 font-medium cursor-pointer">Register</span>
        </p>
      </div>
    </div>
  );
}