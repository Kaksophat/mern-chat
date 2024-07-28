import Messages from "./Messages"
import Messageinput from "./Messageinput"
import { TiMessage } from "react-icons/ti";
import useConversation from "../zustand/useConversation";
import { useEffect } from "react";
import { useAuthContext } from "../context/Authcontext";
const Messagecontainer = () => {
  const { SelectedConversation, setSelectedConversation} = useConversation()

  useEffect(()=>{
    return ()=> setSelectedConversation(null)
  },[setSelectedConversation])
  return (
    <div className='md:min-w-[450px] flex flex-col'>
      {!SelectedConversation? (<NoChatSelected />):(
          <>
          <div className='bg-slate-500 px-4 mb-2'>
          <span className='label-text'>To:</span> <span className='text-gray-900 font-bold '>{SelectedConversation.username}</span>
          </div>
          
          <Messages />
          <Messageinput />
              
          </>
      )

      }
    </div>
  )
}

export default Messagecontainer

const NoChatSelected = ()=>{
  const {authuser} = useAuthContext()
  return (
      <div className="flex items-center justify-center w-full h-full">
          <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-bold flex flex-col
          items-center gap-2">
              <p>Welcome 🖐️ {authuser.username}</p>
              <p>select a chat start messaging</p>
                <TiMessage className="text-3xl md:text-6xl text-center"/>
          </div>
      </div>
  )
}