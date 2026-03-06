const API_URL = 'http://localhost:5000/api';

class APIClient {
  getToken() {
    return localStorage.getItem('access_token');
  }

  async register(email, password, name) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('access_token', data.access_token);
      return data;
    } else {
      throw new Error(data.error || 'Registration failed');
    }
  }

  async login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('access_token', data.access_token);
      return data;
    } else {
      throw new Error(data.error || 'Login failed');
    }
  }

  async getHabits() {
    const res = await fetch(`${API_URL}/habits`, {
      headers: { 'Authorization': `Bearer ${this.getToken()}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  }

  async createHabit(name) {
    const res = await fetch(`${API_URL}/habits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      },
      body: JSON.stringify({ name })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  }

  async deleteHabit(id) {
    const res = await fetch(`${API_URL}/habits/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${this.getToken()}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  }

  async completeHabit(id) {
    const res = await fetch(`${API_URL}/habits/${id}/complete`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${this.getToken()}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  }

  async getStreak(id) {
    const res = await fetch(`${API_URL}/habits/${id}/streak`, {
      headers: { 'Authorization': `Bearer ${this.getToken()}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  }

  async getAnalytics() {
    const res = await fetch(`${API_URL}/analytics`, {
      headers: { 'Authorization': `Bearer ${this.getToken()}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}

export const apiClient = new APIClient();