import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
  return (
    <div>
    <div>Welcome to kanban Board</div>
    <button onClick={()=>navigate('/register')} >Go to Register</button>
    </div>
  )
}

export default Home