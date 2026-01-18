import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import {  HomePage } from "./pages/HomePage"


function App() {
  return (
    <>
      
  <BrowserRouter>
      <nav>
        <Link to="/">الرئيسية</Link>
      </nav>
    <Routes>
      <Route path="/" element={<HomePage/>} />
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
