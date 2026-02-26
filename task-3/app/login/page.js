'use client'
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useState } from 'react';
export default function LoginPage(){
  const[login,setlogin]=useState(true);
  const[data,setdata]=useState({
    name:'',email:'',password:''
  });
  const[showpassword,setpassword]=useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (field) => (e) => {
    setdata({
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
    else if (!data.email.includes('@')) {
      newErrors.email = "Email should be in a proper format";
    }
    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Shortage of characters";
    }
    return Object.keys(newErrors).length===0;

  }
  const handleSubmit = (e) => {
      e.preventDefault();

      if (validateform()) {
        setLoading(true);
        
        setTimeout(() => {
          console.log('Form sent:', data);
          setLoading(false);
        }, 1500);
      }
    };
  const loginoregister =() => {
    setlogin(!login);
    setErrors({ });
    setdata({name:"",email:"",password:""});

  };





  return (
  <div className="min-h-screen flex items-center justify-center bg-black-100">
    
    <div className="bg-white p-8 rounded-xl shadow-md w-96">
      
      <h2 className="text-2xl font-bold mb-6 text-center">
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

        <Button type="submit">
          {loading ? "Loading..." : login ? "Login" : "Register"}
        </Button>

      </form>

      <p className="text-sm text-center mt-4">
        {login ? "Don't have an account?" : "Already have an account?"}
        <span 
          onClick={loginoregister}
          className="text-blue-500 cursor-pointer ml-1"
        >
          {login ? "Register" : "Login"}
        </span>
      </p>

    </div>

  </div>
);
};