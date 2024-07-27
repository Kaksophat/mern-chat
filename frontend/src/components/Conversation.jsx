import useConversation from "../zustand/useConversation";

const Conversation = ({conversation,lastidx,emoji}) => {
  const   { SelectedConversation, setSelectedConversation} = useConversation()

  const isSelected = SelectedConversation?._id === conversation._id
  return (
    <>
    <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
    ${isSelected ? "bg-sky-500": ""}`}
    onClick={()=> setSelectedConversation(conversation)}>
      <div className="avatar online">
        <div className="w-10 rounded-full">
          <img src={conversation.profilepic} />
        </div>
      </div>
      
      <div className="flex flex-col flex-1">
        <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullname}</p>
            <span className="text-xl">{emoji}</span>
        </div>
      </div>
    </div>

  {!lastidx && <div className="divider my-0 py-0 h-1"/>}
    </>
  );
};

export default Conversation;
