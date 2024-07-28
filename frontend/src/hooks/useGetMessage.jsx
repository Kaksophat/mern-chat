import { useEffect, useState } from "react"
import toast from 'react-hot-toast';
import useConversation from "../zustand/useConversation"



const useGetMessage = ()=>{
      const [loading,setloading] = useState(false)
      const {messages,setMessages,  SelectedConversation} = useConversation()

     useEffect(()=>{
        const  getMessage = async()=>{
            setloading(true)
    
          
            try {
                const respones = await fetch(`/api/messages/${SelectedConversation._id}`,{
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'chat-user': `${localStorage.getItem('chat-user')}`,
                    }
                })
                const data = await respones.json()

                if(data.error){
                    console.log(data.error);
                }

                setMessages(data)

            } catch (error) {
                toast.error(error.message);
            } finally{
                setloading(false)
            }
          }
         
          
          if(SelectedConversation?._id) getMessage()
     },[SelectedConversation._id, setMessages])

     return {messages,loading}
}

export default useGetMessage