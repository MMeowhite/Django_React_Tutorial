import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import About from './components/About'
import Home from './components/Home'
import Create from './components/Create'
import NavBar from './components/NavBar'  
import Edit from './components/Edit'
import Delete from './components/Delete'

function App() {
  const myWidth = 200

  return (
    <div className="App">
      <NavBar 
        drawerWidth = {myWidth}
        content = {
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route paht="/delete/:id" element={<Delete />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        } 
      />
    </div>
  )
}

export default App
