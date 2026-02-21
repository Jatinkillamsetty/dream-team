export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Habit Tracker</h1>
                <p className="text-sm text-gray-600">Welcome back, User!</p>
              </div>
            </div>
            
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Dashboard Coming Soon
          </h2>
          <p className="text-gray-600 mb-6">
            We'll build this on Day 7!
          </p>
          <div className="inline-block px-6 py-3 bg-indigo-100 text-indigo-800 rounded-lg">
            For now, you've successfully created:
            <ul className="mt-2 text-left">
              <li>✅ Landing page</li>
              <li>✅ Login page</li>
              <li>✅ Dashboard placeholder</li>
              <li>✅ Reusable components</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
