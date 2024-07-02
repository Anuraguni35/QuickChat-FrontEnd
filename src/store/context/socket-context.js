import { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "./auth-context";
import { ipConfig } from "../../../Core/ipConfig";
import io from "socket.io-client";


export const SocketContext = createContext({
    socket: null,
    onlineUser: [],
});
function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const authCtx = useContext(AuthContext);
   
  useEffect(() => {
    
    if (authCtx?.userData?._id) {
         
      const socket = io(`${ipConfig}/`,{
        query:{
            userId:authCtx.userData._id
        }
      });
      setSocket(socket);

      socket.on("getOnlineUsers",(users)=>{
        console.log(users,"check")
        setOnlineUser((prvState)=>(users));
      })
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authCtx.userData]);

  const value = {
    socket,
    onlineUser,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export default SocketContextProvider;
