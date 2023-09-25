import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Components/home'
import Navbar from './Components/navbar'
import Login from'./Components/login'
import Signup from'./Components/signup'





function App() {
  

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element ={<Home/>} ></Route>
      <Route path='/login' element ={<Login/>} ></Route>
      <Route path='/signup' element ={<Signup/>} ></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
