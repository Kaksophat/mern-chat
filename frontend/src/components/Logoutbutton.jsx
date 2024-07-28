import {BiLogOut} from "react-icons/bi"
import { useAuthContext } from "../context/Authcontext"
const Logoutbutton = () => {
  const {setauthcontext} = useAuthContext()

  const logout = async()=>{
    try {
      const respones = await fetch("/api/auth/logout",{
          method:'POST',
          headers:{"Content-Type": "application/json"},
          
      }) 
      const data = await respones.json()
      if (data.error) {
				throw new Error(data.error);
			}
      localStorage.removeItem("chat-user")
      window.location.replace("/login")
      setauthcontext(null)
  } catch (error) {
      console.log(error.message)
      
  } 
  }
  return (
    <div className='mt-auto'>
        <BiLogOut className="w-6 h-6 text-white cursor-pointer" onClick={logout}/>
    </div>
  )
}

export default Logoutbutton