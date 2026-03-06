'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function Dashboard() {
  const router = useRouter();
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState('');
  const [loading, setLoading] = useState(true);
  const [streaks, setStreaks] = useState({});
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const token = apiClient.getToken();
    if (!token) {
      router.push('/login');
    } else {
      loadHabits();
    }
  }, []);

  const loadHabits = async () => {
    try {
      const data = await apiClient.getHabits();
      setHabits(data.habits);

      const streakPromises = data.habits.map(h => 
        apiClient.getStreak(h.id).then(s => ({ id: h.id, streak: s }))
      );
      const streaksData = await Promise.all(streakPromises);
      
      const streaksObj = {};
      streaksData.forEach(s => streaksObj[s.id] = s.streak);
      setStreaks(streaksObj);
      
      const analyticsData = await apiClient.getAnalytics();
      setAnalytics(analyticsData);
      
    } catch (err) {
      console.error('Error loading habits:', err);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const addHabit = async () => {
    if (!habitName.trim()) return;
    
    try {
      await apiClient.createHabit(habitName);
      setHabitName('');
      loadHabits(); 
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const deleteHabit = async (id) => {
    if (!confirm('Delete this habit?')) return;
    
    try {
      await apiClient.deleteHabit(id);
      loadHabits(); 
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const completeHabit = async (id) => {
    try {
      await apiClient.completeHabit(id);
      loadHabits(); 
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const logout = () => {
    apiClient.logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your habits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl"></span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Habit Tracker</h1>
                <p className="text-sm text-gray-600">s</p>
              </div>
            </div>
            <Button onClick={logout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {analytics && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            
           
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <p className="text-4xl font-bold text-indigo-600">
                {analytics.total_habits}
              </p>
              <p className="text-gray-600 mt-2">Total Habits</p>
            </div>
            
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <p className="text-4xl font-bold text-green-600">
                {analytics.total_completions}
              </p>
              <p className="text-gray-600 mt-2">Total Completions</p>
            </div>
            
            
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <p className="text-4xl font-bold text-purple-600">
                {analytics.completion_rate}%
              </p>
              <p className="text-gray-600 mt-2">Success Rate</p>
            </div>
          </div>
        )}

        
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Enter your  New Habit</h2>
          <div className="flex gap-2">
            <Input
              placeholder="whats your habit?"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addHabit()}
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

       
        {habits.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Habits</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {habits.map(habit => (
                <div 
                  key={habit.id} 
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  
                  
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      {habit.name}
                    </h3>
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="text-red-500 hover:text-red-700 text-xl font-bold"
                      title="Delete habit"
                    >
                      ×
                    </button>
                  </div>
                  
                  
                  {streaks[habit.id] && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Current Streak</p>
                      <p className="text-3xl font-bold text-indigo-600">
                        {streaks[habit.id].current} 🔥
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Best: {streaks[habit.id].longest} days
                      </p>
                    </div>
                  )}
                  
                  
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
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Habits Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start by adding your first habit above!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}