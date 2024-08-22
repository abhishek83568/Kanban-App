
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Task from './components/Task'
import Kanban from './components/Kanban'

function App() {
 

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/task' element={<Task/>} />
      <Route path='/kanban' element={<Kanban/>} />
     </Routes>
    </>
  )
}

export default App
