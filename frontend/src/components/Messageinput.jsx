import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useConversation from "../zustand/useConversation";
import usesendmessages from "../hooks/usesendmessages";

const MessageInput = () => {
const {loading,sendmessages} = usesendmessages()
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message) {
      return;
    }

    await sendmessages(message)
    setMessage("")

   
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="absolute inset-y-0 end-0 flex items-center pe-3" type="submit">
         {loading ? <div className="loading loading-spinner h-1"/> :<BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
