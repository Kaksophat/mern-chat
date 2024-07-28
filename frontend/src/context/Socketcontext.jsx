import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./Authcontext";

export const Socketcontext = createContext();

export const useSocketContext = () => {
	return useContext(Socketcontext);
};

export const Socketcontextprovider = ({ children }) => {
  const [socket, setsocket] = useState(null);
  const [onlineuser, setonlineuser] = useState([]);
  const { authuser } = useAuthContext();

  useEffect(() => {
    if (authuser) {
      const socket = io("http://localhost:4000",{
        query: {
					userId: authuser._id,
				},
      });
      setsocket(socket);
      socket.on("getOnlineUsers", (users) => {
				setonlineuser(users);
			});

      return () => socket.close()
    } else {
      if(socket){
        socket.close()
        setsocket(null)
      }
    }
  },[authuser]);

  return (
    <Socketcontext.Provider value={{ socket, onlineuser }}>
      {children}
    </Socketcontext.Provider>
  );
};
