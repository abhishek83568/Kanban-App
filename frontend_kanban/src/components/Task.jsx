import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Task = () => {
  const navigate=useNavigate()
    const [task,setTask]=useState({
        title:"",
        status:"pending"
    })

const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
        const token=localStorage.getItem('token');
        if(token){
            await fetch(`https://kanbanapp-backend-0kgo.onrender.com/task/create-task`,{
                method:"POST",
                headers:{
                   Authorization:`Bearer ${token}`,
                   "Content-Type": "application/json"
                },
                body:JSON.stringify(task)

            })
           
            alert(`Task added successfully`)
            
        }
    } catch (error) {
        console.log(error)
    }
}


  return (
    <div>
        <h1>Tasks</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <input type="text" name='title' placeholder='Enter task title' onChange={(e)=>setTask({...task,[e.target.name]:e.target.value})} />
            <select name='status' value={task.status} onChange={(e)=>setTask({...task,[e.target.name]:e.target.value})} >
            <option value="">Select status</option>
            <option value="pending">Pending</option> 
            <option value="in-Progress">in-Progress</option> 
            <option value="completed">completed</option> 
          </select>
          <input type="submit"  />
          <button onClick={()=>navigate('/kanban')}>Kanban Board</button>
        </form>
    </div>
  )
}

export default Task
