import  { useState } from 'react'

const useSignup = () => {
    const [Loading,setloading] = useState(false)

    const signup = async({fullname,username,password,comfirmpassword,gender})=>{
        const success = handleInputErrors({fullname,username,password,comfirmpassword,gender})
        if (success) {
            return;
        }

        setloading(true)
        try {
            const respones = await fetch("http://localhost:4000/api/auth/signup",{
                method:'POST',
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({fullname,username,password,comfirmpassword,gender})
            }) 
            const data = await respones.json()
            console.log(data);
        } catch (error) {
            toast.error(error.message)
            
        } finally{
            setloading(false)
        }
    }

    return  {Loading,signup}

}

export default useSignup

function handleInputErrors({fullname,username,password,comfirmpassword,gender}){
    if(!fullname || !username || !password || ! comfirmpassword || !gender){
        toast.error("please fill in all fields.")
        return false
    }

    if (password !== comfirmpassword) {
        toast.error("password don`t match.")
        return false
        
    }

    if(password.length<6){
        toast.error("password must be at least 6 characters.")
        return false
    }

    return true
}