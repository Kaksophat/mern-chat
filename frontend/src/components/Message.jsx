import { useAuthContext } from "../context/Authcontext"
import useConversation from "../zustand/useConversation"
import {extractTime} from"../utils/extraTime"

const Message = ({message}) => {
  const {authuser} = useAuthContext()
  const {SelectedConversation} = useConversation()
  console.log("selectedconversation",SelectedConversation);
  const fromme = message.senderId === authuser._id
  const formatime =extractTime(message.createdAt)
  const chatClassName= fromme ? 'chat-end' :'chat-start'
  const profilePic  = fromme ?  authuser.profilePic : SelectedConversation.profilePic
  const bubbleBgColor = fromme ? 'bg-blue-500' : ""
  const shakeclass = message.shoudshake? "shake" : ""


	
   
  return (
    <div className={`chat ${chatClassName}`}>
    <div className='chat-image avatar'>
      <div className='w-10 rounded-full'>
        <img alt='Tailwind CSS chat bubble component' src={profilePic} />
      </div>
    </div>
    <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeclass}  pb-2`}>{message.message}</div>
    <div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-slate-400'>{formatime}</div>
  </div>
  )
}

export default Message