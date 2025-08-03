import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from "./pages/Auth/Login/Login.jsx";
import Create from "./pages/Auth/Create/Create.jsx";
import Blog from "./pages/Home/Home.jsx";
import Dash from "./pages/Dashboard/Dash.jsx"
import CreatePost from "./pages/Dashboard/CreatPost/CreatePost.jsx";
import MyPosts from "./pages/Dashboard/MyPosts/MyPosts.jsx";

import Auth from "./service/Auth.jsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Auth><Blog /></Auth>} />
        <Route path='/login' element={<Login />}/>
        <Route path='/create' element={<Create />} />
        <Route path='/blog' element={<Auth><Blog /></Auth>} />
        <Route path='/dash' element={<Auth><Dash /></Auth>} />
        <Route path='/createPost' element={<Auth><CreatePost /></Auth>} />
        <Route path='/myPosts' element={<Auth><MyPosts /></Auth>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
