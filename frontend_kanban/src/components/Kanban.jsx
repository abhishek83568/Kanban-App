import React, { useEffect, useState } from "react";
import '../App.css'
import { useNavigate } from "react-router-dom";
const Kanban = () => {
    const navigate=useNavigate()
  const [allTask, setAllTask] = useState([]);
  const [userTask, setUserTask] = useState([]);
  const [editTask,setEditTask]=useState({
    title:"",
    status:""
  })
  const [draggedTask, setDraggedTask] = useState(null);

  const [userId,setUserId]=useState("")

  const handleGetAllTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://kanbanapp-backend-0kgo.onrender.com/task/get-Alltasks`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
     
      if (data) {
        setAllTask(data.task);
       
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserTask=async()=>{
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://kanbanapp-backend-0kgo.onrender.com/task/get-tasks`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const data = await response.json();
        console.log(data);
        if (data) {
            setUserTask(data.task);
         
        }
      } catch (error) {
        console.log(error);
      }
  }

  const handleEdit=(task)=>{
      setUserId(task._id);
      setEditTask({
        title:task.title,
        status:task.status
      })
  }

  const handleEditFormSubmit=async(e)=>{
    e.preventDefault();
    try {
        const token=localStorage.getItem('token')
       const data= await fetch(`https://kanbanapp-backend-0kgo.onrender.com/task/update-task/${userId}`,{
            method:"PATCH",
            headers:{
                "content-type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(editTask)
        })

      
      handleUserTask()
      alert(`Data updated successfully`)
    } catch (error) {
        console.log(error)
    }
  }

  const handleDelete=async(taskId)=>{
    try {
        const token=localStorage.getItem('token');
        await fetch(`https://kanbanapp-backend-0kgo.onrender.com/task/delete-task/${taskId}`,{
            method:"DELETE",
            headers:{
                "content-type":"application/json",
                Authorization:`Bearer ${token}`
            },
         
        })
        handleUserTask()
        
        alert('Task deleted successfully')
    } catch (error) {
        console.log(error)
    }
  }
  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDrop = async (status) => {
    if (draggedTask && draggedTask.status !== status) {
      const updatedTask = { ...draggedTask, status };

      try {
        const token = localStorage.getItem("token");
        await fetch(
          `https://kanbanapp-backend-0kgo.onrender.com/task/update-task/${draggedTask._id}`,
          {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedTask),
          }
        );
        setUserTask((prev) =>
          prev.map((task) =>
            task._id === draggedTask._id ? updatedTask : task
          )
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

//   const handleAdminDeleteTask = async (taskId) => {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(
//             `https://kanbanapp-backend-0kgo.onrender.com/task/delete-task/${taskId}`, {
//                 method: "DELETE",
//                 headers: {
//                     "content-type": "application/json",
//                     Authorization: `Bearer ${token}`
//                 },
//             }
//         );

//         if (response.ok) {
//             handleGetAllTask();
//             alert('Task deleted successfully');
//         } else {
//             const errorData = await response.json();
//             alert(`Failed to delete task: ${errorData.message}`);
//         }
//     } catch (error) {
//         console.error("Error deleting task:", error);
//         alert('An error occurred while deleting the task.');
//     }
// };

const handleLogout=async()=>{
    try {
        const token=localStorage.getItem('token');
        await fetch(`https://kanbanapp-backend-0kgo.onrender.com/user/logout`,{
            method:"GET",
            headers:{
                "content-type":"application/json",
                Authorization:`Bearer ${token}`
            }
        })

        alert(`User logout successfully `)
        localStorage.removeItem("token")
        navigate('/login')
        
    } catch (error) {
        
    }
}


  useEffect(() => {
    handleUserTask()
  }, []);

  return (
    <div id="todo-container">

      <h1 style={{ color: "white" }}>Kanban</h1>
      <div style={{margin:20}}>

      <button onClick={handleLogout} >Logout</button>
      </div>
      <div>
        <h2>Only  Admin can Access It.</h2>
        <button onClick={handleGetAllTask}>Get All</button>
        <div>
          {allTask.length > 0 ? (
            <ul>
              {allTask.map((task) => (
                <li key={task._id}>
                  {task.title} - {task.status}
                  {/* <button onClick={()=>handleAdminDeleteTask(task._id)}>Delete</button> */}

                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks found.</p>
          )}
        </div>
      </div>
      {/* <div>
        <h1>TODO</h1>
        <button onClick={handleUserTask}>Get My Tasks</button>
        <div>
        {userTask.length > 0 ? (
            <ul>
            {userTask.map((task) => (
                <li key={task._id}>
                {task.title} - {task.status}
                <button onClick={()=>handleEdit(task)}>Edit</button>
                <button onClick={()=>handleDelete(task._id)}>Delete</button>
                </li>
                ))}
                </ul>
                ) : (
                    <p>No tasks found.</p>
                    )}
                    </div>
                    </div> */}
      <div className="status-column">
          <h1>TODO</h1>
          <button onClick={handleUserTask}>Get My Tasks</button>
          <div
            className="task-list"
            onDrop={() => handleDrop("pending")}
            onDragOver={handleDragOver}
          >
            {userTask
              .filter((task) => task.status === "pending")
              .map((task) => (
                <div
                  key={task._id}
                  draggable
                  onDragStart={() => handleDragStart(task)}
                  className="task-item"
                >
                  {task.title}
                  <button onClick={()=>handleDelete(task._id)}>Delete</button>
                  <button onClick={()=>handleEdit(task)}>Edit</button>
                </div>
              ))}
          </div>
        </div>
        <div className="status-column">
          <h1>In-Progress</h1>
          <div
            className="task-list"
            onDrop={() => handleDrop("in-Progress")}
            onDragOver={handleDragOver}
          >
            {userTask
              .filter((task) => task.status === "in-Progress")
              .map((task) => (
                <div
                  key={task._id}
                  draggable
                  onDragStart={() => handleDragStart(task)}
                  className="task-item"
                  >
                  {task.title}
                  <button onClick={()=>handleDelete(task._id)}>Delete</button>
                  <button onClick={()=>handleEdit(task)}>Edit</button>
                </div>
              ))}
          </div>
        </div>
        <div className="status-column">
          <h1>Completed</h1>
          <div
            className="task-list"
            onDrop={() => handleDrop("completed")}
            onDragOver={handleDragOver}
          >
            {userTask
              .filter((task) => task.status === "completed")
              .map((task) => (
                <div
                  key={task._id}
                  draggable
                  onDragStart={() => handleDragStart(task)}
                  className="task-item"
                >
                  {task.title}
                  <button onClick={()=>handleDelete(task._id)}>Delete</button>
                  <button onClick={()=>handleEdit(task)}>Edit</button>
                </div>
              ))}
          </div>
        </div>
      <div>
         {
             userId && <form onSubmit={(e)=>handleEditFormSubmit(e)}>
                <input type="text" name="title" value={editTask.title} onChange={(e)=>setEditTask({...editTask,title:e.target.value})} required/>
                <select name="status" value={editTask.status} onChange={(e)=>setEditTask({...editTask,status:e.target.value})} required>
                 <option value="pending">Pending</option>
                 <option value="in-Progress">In-Progress</option>
                <option value="completed">Completed</option>
                </select>
                <button type="submit">Done</button>
            </form>
         }
      </div>
      
      
    </div>
  );
};

export default Kanban;

