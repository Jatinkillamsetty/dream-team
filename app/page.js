export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          Habit Tracker
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Build better habits, one day at a time
        </p>
        
        <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors">
          Get Started
        </button>
      </div>
    </main>
  );
}