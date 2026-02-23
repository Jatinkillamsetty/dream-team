'use client'
import Button from '@/components/Button';
import Input from '@/components/Input';
import { use, useState } from 'react';
const[login,setlogin]=useState(true);
const[data,setdata]=useState({
  name:'',email:'',password:''
});
const[showpassword,setpassword]=useState(False);
const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);
const handleChange = (field) => (e) => {
  setFormData({
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
const validateform=()=>{
  const newErrors={}
  if (!login && !data.name.trim()){
    newErrors.name="name is required here";
  }
  if (!data.email.trim()){
    newErrors.email="email is required here";
  }
  else if (!formData.email.includes('@')) {
    newErrors.email = "Email should be in a proper format";
  }
  if (!formData.password) {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 6) {
    newErrors.password = "Shortage of characters";
  }
  return Object.keys(newErrors)===0;

}
const handleSubmit = e => {
  if (!validateform()){
    return ;
  }
  setLoading(true);
  
}
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Habit Tracker
          </h1>
          <p className="text-gray-600">Welcome back! Please login to continue</p>
        </div>

        {/* Login/Register Tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
          <button className="flex-1 py-2 px-4 rounded-md font-medium bg-white text-indigo-600 shadow transition-all">
            Login
          </button>
          <button className="flex-1 py-2 px-4 rounded-md font-medium text-gray-600 hover:text-gray-900 transition-all">
            Register
          </button>
        </div>

        {/* Login Form - NOW USING OUR COMPONENTS */}
        <form className="space-y-4">
          
          {/* Email Field - Using Input Component */}
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            required
          />
          
          {/* Password Field - Using Input Component */}
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            required
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline">
              Forgot password?
            </a>
          </div>
          
          {/* Submit Button - Using Button Component */}
          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            fullWidth
          >
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Social Login Buttons - Also Using Button Component */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" size="md">
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm">Google</span>
            </div>
          </Button>
          
          <Button variant="outline" size="md">
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-sm">GitHub</span>
            </div>
          </Button>
        </div>
        
        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline">
            Sign up for free
          </a>
        </p>
      </div>
    </div>
  );
}