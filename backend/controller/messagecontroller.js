const Message = require("../model/message");
const Conversation = require("../model/conversation");

const sendmessage = async(req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Ensure IDs are ObjectId
    

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newmessage = new Message({
            senderId ,
            receiverId,
            message,
        });


        if (newmessage) {
            conversation.message.push(newmessage._id);
        }
        
        // await conversation.save()
        // await newmessage.save()

        await Promise.all([conversation.save(),newmessage.save()])
        res.status(201).json(newmessage);
    } catch (error) {
        console.log("error in sendmessage:", error.message);
        res.status(500).json({ error: "External server error" });
    }
}

const getmessage = async(req,res)=>{
    try {
        const {id:userToChat} = req.params
        const senderId = req.user._id
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChat] },
        }).populate("message");
        if(!conversation){
            return res.status(200).json([])
        }
        res.status(200).json(conversation.message);
    } catch (error) {
        console.log("error in getmessagecontroller:", error.message);
        res.status(500).json({ error: "External server error" });
    }
}

module.exports = { sendmessage ,getmessage};
