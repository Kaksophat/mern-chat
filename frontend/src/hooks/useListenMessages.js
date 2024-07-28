import { useEffect } from "react"
import { useSocketContext } from "../context/Socketcontext"
import useConversation from "../zustand/useConversation"

const useListionmessage = ()=>{
    const {socket} = useSocketContext()
    const {messages,setMessages} = useConversation()

    useEffect(()=>{
           socket?.on("newMessage",(newMessage)=>{
            messages.shoudshake= true
            setMessages([...messages,newMessage])
           })

           return ()=> socket?.off("newMessage")
    },[socket,setMessages,messages])


}

export default useListionmessage