import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversation] = useState([]);

    useEffect(() => {
        const getConversation = async () => {
            setLoading(true);
            
                try {
                    const response = await fetch('/api/users', {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            'chat-user': `${localStorage.getItem('chat-user')}`
                        }
                    });

                    const data = await response.json();
                    console.log(data);
                    if (response.status !== 200) {
                        throw new Error(data.error || 'Failed to fetch conversations');
                    }
                    setConversation(data);
                    
                } catch (error) {
                    toast.error(error.message);
                    console.error(error.message);
                } finally {
                    setLoading(false);
                }
            } 
        

        getConversation();
    }, []);

    return { loading, conversations };
};

export default useGetConversation;
