import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/Authcontext";
import { useState } from "react";
const Login = () => {
  const {setauthcontext} = useAuthContext()

  const [inputs,setinput] = useState({
    username:"",
    password:"",
  })

  const handlesubmit = async(e)=>{
       e.preventDefault()
    try {
      const respones = await fetch("/api/auth/login",{
          method:'POST',
          headers:{
            Accept: 'application/form-data',
            "Content-Type": "application/json"},
          body: JSON.stringify(inputs)
      }) 
      const data = await respones.json()
      if(respones.status === 200){
      localStorage.setItem("chat-user", JSON.stringify(data))
      window.location.replace('/')
      setauthcontext(data)
      }else{
        console.log("error login");
      }
  } catch (error) {
      console.log(error.message)
      
  } 
  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg
      bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500
          ">ChatApp</span>
        </h1>

        <form onSubmit={handlesubmit}>
            <div>
                <label className="label p-2">
                    <span className="text-base label-text">Username</span>
                </label>
                <input type="text" placeholder="Enter Username" className="w-full input input-bordered h-10 bg-black text-white" 
                value={inputs.username}
                onChange={(e)=> setinput({...inputs,username:e.target.value})}/>
                
            </div>

            <div>
                <label className="label ">
                    <span className="text-base label-text">Password</span>
                </label>
                <input type="password" placeholder="Enter password" className="w-full input input-bordered h-10 bg-black text-white" 
                 value={inputs.password}
                 onChange={(e)=> setinput({...inputs,password:e.target.value})}/>
            </div>
          <Link to={"/signup"}  className="text-am hover:underline hover:text-blue-600 mt-2 inline-block" href='#'>
                {"don`t"} have an account?
             </Link>
            
            <div>
                <button className="btn btn-block btn-sm mt-2 bg-black border-none text-white">Login</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
