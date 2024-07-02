 
import {useState, createContext} from 'react';
import * as SecureStore from 'expo-secure-store';
export const AuthContext = createContext({
  token: '',
  userData: {},
  isAuthenticated: false,
  saveToken:(token)=>{},
  updateUserData:(userData)=>{},
  updateAuthentication:(isAuthenticated)=>{},
  logOut:()=>{}, 
});
function AuthContextProvider({children}) {
  const [authToken, setAuthToken] = useState();
  const [userData, setUserData] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);


   const saveToken=async(token)=>{
   setAuthToken(token);
   await SecureStore.setItemAsync("token", token);
   }

   const updateUserData=(userData)=>{
    setUserData(userData);
   }

   const updateAuthentication=(isAuthenticated)=>{
    setIsAuthenticated(isAuthenticated);
   }

   const logOut=async()=>{
    setAuthToken('');
    setUserData({});
    setIsAuthenticated(false);
   await SecureStore.deleteItemAsync('token');
   }


  const value = {
    token: authToken,
    userData: userData,
    isAuthenticated: isAuthenticated,
    logOut:logOut,
    updateUserData: updateUserData,
    updateAuthentication: updateAuthentication,
    saveToken: saveToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
