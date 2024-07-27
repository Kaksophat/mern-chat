import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"
import Home from "./pages/Home/Home"
import {Routes,Route, Navigate} from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useAuthContext } from "./context/Authcontext"

const App = () => {
  const {authuser} = useAuthContext()
  return (
   <div className="p-4 h-screen flex items-center justify-center">
   <Routes >
     <Route path="/" element={authuser ? <Home/> : <Navigate to="/login"/>} />
     <Route path="/login" element={authuser ? <Navigate to="/"/> : <Login/>} />
     <Route path="/signup" element={authuser ? <Navigate to="/"/> : <Signup/>} />
   </Routes>
   <Toaster />
   </div>
  )
}

export default App