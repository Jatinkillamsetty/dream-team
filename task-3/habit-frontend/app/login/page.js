'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();

  const [login, setLogin] = useState(true);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setData({
      ...data,
      [field]: e.target.value
    });

    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!login && !data.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!data.email.includes('@')) {
      newErrors.email = "Invalid email format";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      if (login) {
        await apiClient.login(data.email, data.password);
      } else {
        await apiClient.register(data.email, data.password, data.name);
      }

      router.push('/dashboard');

    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setLogin(!login);
    setErrors({});
    setData({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
          {login ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {!login && (
            <Input
              placeholder="Name"
              value={data.name}
              onChange={handleChange("name")}
            />
          )}

          <Input
            placeholder="Email"
            value={data.email}
            onChange={handleChange("email")}
          />

          <Input
            placeholder="Password"
            type="password"
            value={data.password}
            onChange={handleChange("password")}
          />

          <Button type="submit" disabled={loading}>
            {loading
              ? "Processing..."
              : login
              ? "Login"
              : "Register"}
          </Button>

        </form>

        {errors.general && (
          <p className="text-red-600 text-sm text-center mt-3">
            {errors.general}
          </p>
        )}

        <p className="text-sm text-center mt-4 text-black">
          {login ? "Don't have an account?" : "Already have an account?"}

          <span
            onClick={toggleMode}
            className="text-red-600 font-semibold cursor-pointer ml-1 hover:text-red-700"
          >
            {login ? "Register" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
}