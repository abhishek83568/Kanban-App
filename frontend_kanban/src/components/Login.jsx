import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch(
        `https://kanbanapp-backend-0kgo.onrender.com/user/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(login),
        }
      );
      const data=await response.json();
      console.log(data);
      if(data){
        localStorage.setItem('token',data.token)
        alert(`${data.message}`);
        navigate("/task");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 style={{ color: "teal" }}>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={(e) =>
            setLogin({ ...login, [e.target.name]: e.target.value })
          }
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={(e) =>
            setLogin({ ...login, [e.target.name]: e.target.value })
          }
          required
        />
        
        <input type="submit" />
      </form>
      <h2>User didn't Registered <Link to="/register">Register</Link></h2>
    </div>
  );
};

export default Login;
