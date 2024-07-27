import { createContext, useContext, useState } from "react";

export const Authcontext = createContext()

export const useAuthContext = ()=>{
        return useContext(Authcontext)
}
export const Authcontextprovider = ({children})=>{
    const [authuser, setauthuser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null)
 

    return <Authcontext.Provider value={{authuser,setauthuser}}>
             {children}
    </Authcontext.Provider>
} 