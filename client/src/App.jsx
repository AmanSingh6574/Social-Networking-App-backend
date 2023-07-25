
import { Routes , Route } from 'react-router-dom'
import './App.css'
import LoginForm from './Components/LoginForm'
import Navbar from './Components/Navbar'
import SignupForm from './Components/Signform'
import Home from './pages/Home'
import Profile from './pages/Profile'


function App() {

  return (
    <div className="App">
      <Navbar/>
    
      <Routes>
        <Route path="/login" element ={<LoginForm/>} />
        <Route path ="/signup" element ={<SignupForm/>}/> 
        <Route path="/" element = {<Home/>}  />
        <Route path='/profile' element={<Profile/>} ></Route>
      </Routes>

    </div>
  )
}

export default App
