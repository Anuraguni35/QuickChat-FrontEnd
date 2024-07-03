import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from "./src/Pages/Login";
import Signup from "./src/Pages/Signup";
import ChatList from "./src/Pages/ChatList";

import ChatArea from "./src/Pages/ChatArea";
import More from "./src/Pages/More";
import AuthContextProvider, {
  AuthContext,
} from "./src/store/context/auth-context";
import { NavigationContainer, useFocusEffect, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomePage from "./src/Pages/WelcomePage";
import BlankPage from "./src/Pages/BlankPage";
import SocketContextProvider from "./src/store/context/socket-context.js"
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as SecureStore from 'expo-secure-store';
import { ipConfig } from "./Core/ipConfig";
import axios from "axios";
import Constants from "expo-constants";
const Stack: any = createNativeStackNavigator();
function AuthStack() {


  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomePage"
        component={WelcomePage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="blankPage"
        component={BlankPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
   console.log()
  useEffect(() => {
    registerForPushNotificationsAsync().then((token:any) => setExpoPushToken(token));
  
    notificationListener.current = Notifications.addNotificationReceivedListener((notification:any) => {
      setNotification(notification);
    });
  
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    }); 
  
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  
  
  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      token = (await Notifications.getExpoPushTokenAsync({ projectId: Constants?.expoConfig?.extra?.eas?.projectId })).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }
  
  return (
    <Stack.Navigator initialRouteName="Tallycompanies">
      <Stack.Screen
        name="chatList"
        component={ChatList}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="chatArea"
        component={ChatArea}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="More"
        component={More}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
function Navigation() {
  const authCtx: any = useContext(AuthContext);

  useEffect(()=>{
    CheckAuth()
  },[])

  const CheckAuth=async()=>{
    const token=await SecureStore.getItemAsync('token');
    if(token){
      console.log(token);
      try{
        const res=await axios.get(`${ipConfig}/auth/validateUser`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })

        if(res.status===200){
          authCtx.updateAuthentication(true);
          authCtx.updateUserData(res.data.user);
          authCtx.saveToken(token);
        }
      }catch(err){
        console.log(err)
        authCtx.updateAuthentication(false);
        return;
      }
    }else{
      authCtx.updateAuthentication(false);
    }
  }
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider>
        <AuthContextProvider>
          <SocketContextProvider>
            <Navigation />
          </SocketContextProvider>
        </AuthContextProvider>
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
