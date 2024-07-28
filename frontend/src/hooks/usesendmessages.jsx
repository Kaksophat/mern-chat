import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const usesendmessages = () => {
  const [loading, setloading] = useState(false);
  const { messages, setMessages, SelectedConversation } = useConversation();
  const sendmessages = async (message) => {
    setloading(true);

    try {
      const respones = await fetch(
        `/api/messages/send/${SelectedConversation._id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/form-data",
            "Content-Type": "application/json",
            "chat-user": `${localStorage.getItem("chat-user")}`,
          },
          body: JSON.stringify({ message }),
        }
      );
      const data = await respones.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  return { loading, sendmessages };
};

export default usesendmessages;
