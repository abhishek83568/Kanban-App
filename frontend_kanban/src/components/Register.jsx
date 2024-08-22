import React, { useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",  // Set the default role to "user"
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch(
        `https://kanbanapp-backend-0kgo.onrender.com/user/register`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(register),
        }
      );

      console.log(response);
      alert("User registered successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 style={{ color: "teal" }}>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter userName"
          onChange={(e) =>
            setRegister({ ...register, [e.target.name]: e.target.value })
          }
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={(e) =>
            setRegister({ ...register, [e.target.name]: e.target.value })
          }
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={(e) =>
            setRegister({ ...register, [e.target.name]: e.target.value })
          }
          required
        />
        <select
          name="role"
          value={register.role}  // Bind the select value to the role in state
          onChange={(e) =>
            setRegister({ ...register, [e.target.name]: e.target.value })
          }
          required
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <input type="submit" />
      </form>
      <h2>User Already Registered <Link to="/login">login now</Link></h2>
    </div>
  );
};

export default Register;
