import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Home from './Components/home'
import Navbar from './Components/navbar'
import Login from'./Components/login'
import Signup from'./Components/signup'
import { useAuthContext } from './hooks/useAuthContext'





function App() {
  const {user} = useAuthContext()

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element ={user ? <Home/> : <Navigate to="/Login"/>} ></Route>
      <Route path='/login' element ={!user ? <Login/> : <Navigate to="/"/>} ></Route>
      <Route path='/signup' element ={!user ? <Signup/>: <Navigate to="/"/>} ></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
