'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function Dashboard() {
  const router = useRouter();
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
    } else {
      // For now, just use dummy data
      // We'll connect to backend later
      loadDummyHabits();
    }
  }, []);

  const loadDummyHabits = () => {
    // Dummy data for now
    setHabits([
      { id: 1, name: 'Exercise', streak: 5 },
      { id: 2, name: 'Read', streak: 3 },
      { id: 3, name: 'Meditate', streak: 7 }
    ]);
  };

  const addHabit = () => {
    if (!habitName.trim()) return;
    
    const newHabit = {
      id: Date.now(),
      name: habitName,
      streak: 0
    };
    
    setHabits([...habits, newHabit]);
    setHabitName('');
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const completeHabit = (id) => {
    setHabits(habits.map(h => 
      h.id === id ? { ...h, streak: h.streak + 1 } : h
    ));
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Habit Tracker</h1>
                <p className="text-sm text-gray-600">Track your daily habits</p>
              </div>
            </div>
            <Button onClick={logout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-4xl font-bold text-indigo-600">{habits.length}</p>
            <p className="text-gray-600 mt-2">Total Habits</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-4xl font-bold text-green-600">
              {habits.reduce((sum, h) => sum + h.streak, 0)}
            </p>
            <p className="text-gray-600 mt-2">Total Completions</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-4xl font-bold text-purple-600">
              {habits.length > 0 ? Math.max(...habits.map(h => h.streak)) : 0}
            </p>
            <p className="text-gray-600 mt-2">Best Streak</p>
          </div>
        </div>

        {/* Add Habit Form */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Habit</h2>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Exercise, Read, Meditate"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={addHabit} 
              variant="primary"
              disabled={!habitName.trim()}
            >
              Add Habit
            </Button>
          </div>
        </div>

        {/* Habits Grid */}
        {habits.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Habits</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {habits.map(habit => (
                <div key={habit.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{habit.name}</h3>
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="text-red-500 hover:text-red-700 text-xl"
                    >
                      ×
                    </button>
                  </div>
                  
                  {/* Streak Display */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Current Streak</p>
                    <p className="text-3xl font-bold text-indigo-600">
                      {habit.streak} 🔥
                    </p>
                  </div>
                  
                  {/* Complete Button */}
                  <Button
                    onClick={() => completeHabit(habit.id)}
                    variant="success"
                    fullWidth
                  >
                    ✓ Mark Complete
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Habits Yet</h3>
            <p className="text-gray-600 mb-6">Start by adding your first habit above!</p>
          </div>
        )}
      </main>
    </div>
  );
}