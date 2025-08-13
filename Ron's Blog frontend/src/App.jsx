import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from "./pages/Auth/Login/Login.jsx";
import Create from "./pages/Auth/Create/Create.jsx";
import Blog from "./pages/Home/Home.jsx";
import Dash from "./pages/Dashboard/Dash.jsx"
import CreatePost from "./pages/Dashboard/CreatPost/CreatePost.jsx";
import MyPosts from "./pages/Dashboard/MyPosts/MyPosts.jsx";
import Saved from "./pages/Dashboard/SavedPosts/Saved.jsx";

import Auth from "./service/Auth.jsx";

import Editar from "./pages/Dashboard/MyPosts/Editar/Editar.jsx";

import MyCount from "./pages/Auth/MyCount/MyCount.jsx";

import EditCount from "./pages/Auth/MyCount/EditCount/EditCount.jsx";

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
        <Route path='/myPosts/editar/:id' element={<Auth><Editar /></Auth>} />
        <Route path='/savedPost' element={<Auth><Saved /></Auth>} />
        <Route path='/myCount' element={<Auth><MyCount /></Auth>} />
        <Route path='/editCount' element={<Auth><EditCount /></Auth>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
