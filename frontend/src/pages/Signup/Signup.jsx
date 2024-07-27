import { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/Authcontext";
const Signup = () => {
  const {setauthcontext} = useAuthContext()
  const [inputs, setinputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const handleCheackboconchange = (gender)=>{
    setinputs({...inputs,gender})
  }

const  handlesubmit = async (e)=>{
      e.preventDefault()
    //   const data = await signup(inputs)
    //   console.log(data);
    if (inputs.password !== inputs.confirmPassword) {
      console.log("Passwords do not match!");
      return;
    }
  
    try {
        const respones = await fetch("/api/auth/signup",{
            method:'POST',
            headers:{
              Accept: 'application/form-data',
              "Content-Type": "application/json"},
            body: JSON.stringify(inputs)
        }) 
        const data = await respones.json()
        console.log(data);
        if(data.status == 201){
        localStorage.setItem("chat-user", JSON.stringify(data))
        window.location.replace('/')
        setauthcontext(data)
        }else{
          console.log("error signup");
        }
    } catch (error) {
        console.log(error.message)
        
    } 
}
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div
        className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg
    bg-opacity-0"
      >
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signup
          <span
            className="text-blue-500
        "
          >
            ChatApp
          </span>
        </h1>

        <form onSubmit={handlesubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Fullname</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10 bg-black text-white"
              value={inputs.fullName}
              onChange={(e) =>
                setinputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter password"
              className="w-full input input-bordered h-10 bg-black text-white"
              value={inputs.username}
              onChange={(e)=>setinputs({...inputs,username:e.target.value})}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10 bg-black text-white"
              value={inputs.password}
              onChange={(e)=>setinputs({...inputs,password:e.target.value})}
            />
          </div>

          <div>
            <label className="label ">
              <span className="text-base label-text"> confirmPassword</span>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input input-bordered h-10 bg-black text-white"
              value={inputs.confirmPassword}
              onChange={(e)=>setinputs({...inputs,confirmPassword:e.target.value})}
            />
          </div>

          {/* {"GENDER CHECKBOX HERE"} */}
          <GenderCheckbox onCheckBoxChange={handleCheackboconchange} selectedGender={inputs.gender}/>
          <Link
            to={"/login"}
            href="#"
            className="text-am hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2 bg-black border-none text-white">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
