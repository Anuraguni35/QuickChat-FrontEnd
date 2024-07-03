import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import { ipConfig } from "../../Core/ipConfig";
import { AuthContext } from "../store/context/auth-context";
import axios from "axios";
import { ActivityIndicator, Avatar, Badge } from "react-native-paper";
import { SocketContext } from "../store/context/socket-context";
import Icon from "react-native-vector-icons/AntDesign"
const ChatList = ({ navigation }: any) => {
  const [userContect, setUserContect] = useState([]);
  const authCtx:any = useContext(AuthContext);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const socketCtx:any=useContext(SocketContext)
   
  const background_image_1 = require("../../assets/BackGround.jpg");
     
  useEffect(() => {
     
    navigation.setOptions({
      headerTitle: "",
      tabBarVisible: false,
      // header: ({ navigation }: any) => (
      //   <CustomHeaderWithElement
      //     navigation={navigation}
      //     title={route?.params?.data?.title}
      //     btn={true}
      //     sharebtn={false}
      //   />
      // ),
      headerLeft: () => (
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#80c6ff" }}>
            Quick
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginLeft: 5,
              color: "#ffd64f",
            }}
          >
            Chat
          </Text>
        </View>
      ),
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.navigate("More");
          }}
        >
           <Image
            style={{ height: 40, width: 40 }}
            source={{ uri: authCtx?.userData?.profilePic }}
          /> 
        </Pressable>
      ),
    });
  }, [authCtx.userData]);
  useEffect(() => {
    (async () => {
      setIsloading(true);
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data?.length > 0) {
          const contact: any = [];
          data?.forEach((item) => {
            // Check if the object has phoneNumbers key
            if (item.phoneNumbers && Array.isArray(item.phoneNumbers)) {
              item.phoneNumbers.forEach((phoneObj) => {
                if (phoneObj.number) {
                  // Clean the number by removing +91 prefix
                  let cleanedNumber = phoneObj.number.replace(/^\+91/, "");
                  contact.push(cleanedNumber);
                }
              });
            }
          });
          // console.log(contact);
          setUserContect(contact);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (userContect?.length > 0) getUserList();
  }, [userContect,socketCtx.onlineUser]);
  const getUserList = async () => {
    try {
      const res = await axios.post(
        `${ipConfig}/users/`,
        { phoneNumberArray: userContect },
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      );
    
      setUserList(res?.data);
    } catch (err) {
      console.log(err, "errs from contact list");
    } finally {
      setIsloading(false);
    }
  };

  const renderItem = ({ item }: any) => {
   
    return (
      <Pressable
        key={item.phoneNumber}
        style={{
          padding: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "white",
          marginHorizontal: 10,
          marginTop: 10,
          borderRadius: 20,
        }}
        onPress={() => {
          navigation.navigate("chatArea", {
            userId: item._id,
            Name: item.fullName,
            profilePic: item.profilePic,
          });
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: item.profilePic }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              marginRight: 10,
            }}
          />
          {socketCtx.onlineUser.includes(item._id)&&<Badge style={{backgroundColor:"green",position:"absolute",top:5,left:40}} size={10}></Badge>}
          <View>
            <Text style={{ fontWeight: "500", fontSize: 18, color: "#28282B" }}>
              {item.fullName}
            </Text>
            {socketCtx.onlineUser.includes(item._id)?<Text style={{ color: "grey" }}>Active Now</Text>:<Text style={{ color: "grey" }}>Offline</Text>}
          </View>
        </View>
        <View>
          <Text>04:05</Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={{ height: "100%" }}>
      <ImageBackground
        source={background_image_1}
        style={{
          height: "100%",
          width: "100%",
        }}
        resizeMethod="resize"
        resizeMode="cover"
      >
        {isLoading ? (
          <ActivityIndicator size={50} style={{height:"90%"}} color="#80c6ff" />
        ) : (
          <FlatList data={userList} renderItem={renderItem} />
        )}
      </ImageBackground>
    </View>
  );
};

export default ChatList;
