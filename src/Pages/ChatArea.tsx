import {
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  FlatList,
  TextInput,
  Dimensions,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/FontAwesome";
import { ActivityIndicator, Badge } from "react-native-paper";
import { ipConfig } from "../../Core/ipConfig";
import { AuthContext } from "../store/context/auth-context";
import axios from "axios";
import moment from "moment";
import { SocketContext } from "../store/context/socket-context";
import * as Haptics from 'expo-haptics';

const ChatSection = ({ navigation, route }: any) => {
  const background_image_1 = require("../../assets/BackGround.jpg");
  const authCtx: any = useContext(AuthContext);
  const [chatList, setChatList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const FlatListRef = null;
  const socketCtx = useContext(SocketContext);

  useEffect(() => {
    socketCtx?.socket?.on("newMessage", (newMessage) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy,);
      getChat();
       
      // Haptics.NotificationFeedbackType.Success
    });
    return () => socketCtx?.socket?.off("newMessage");
  }, [socketCtx.socket]);
  
   

  useEffect(() => {
    getChat();
    navigation.setOptions({
      headerTitle: "",
      tabBarVisible: true,
      // header: ({ navigation }: any) => (
      //   <CustomHeaderWithElement
      //     navigation={navigation}
      //     title={route?.params?.data?.title}
      //     btn={true}
      //     sharebtn={false}
      //   />
      // ),

      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon name="arrowleft" size={25} />
          </Pressable>

          <Image
            style={{ height: 45, width: 45, marginLeft: 5 }}
            source={{ uri: route.params.profilePic }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "500" }}>
              {route.params.Name}
            </Text>
            {socketCtx.onlineUser.includes(route?.params?.userId) ? (
              <Text style={{ flexDirection: "row", alignItems: "center" }}>
                Online
              </Text>
            ) : (
              <Text style={{ flexDirection: "row", alignItems: "center" }}>
                Offline
              </Text>
            )}
          </View>
        </View>
      ),
    });
  }, []);

  const getChat = async () => {
    try {
      const res = await axios.get(
        `${ipConfig}/messages/${route.params.userId}`,
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      );
      setChatList(res.data.reverse());
      
    } catch (err) {
      console.log(err, "Error from get chat");
      setChatList([]);
    } finally {
    }
  };

  const sendChat = async () => {
    try {
      const res = await axios.post(
        `${ipConfig}/messages/send/${route.params.userId}`,
        { message: newMessage },
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      );
      console.log(res);
      getChat();
      setNewMessage("");
    } catch (err) {
      console.log(err, "error from send chat");
    }
  };

  const myLogo = authCtx?.userData?.profilePic;
  const userLogo = route?.params?.profilePic;

  const renderItem = ({ item }: any) => {
    return (
      <View
        style={{
          flexDirection:
            item?.senderId === authCtx?.userData?._id ? "row" : "row",
          alignItems: "center",
          justifyContent:
            item?.senderId === authCtx?.userData?._id
              ? "flex-end"
              : "flex-start",
          padding: 10,
          marginVertical: 5,
          marginHorizontal: 10,
          backgroundColor:
            item?.senderId === authCtx?.userData?._id ? "#DCF8C6" : "white",
          borderRadius: 10,
          maxWidth: "80%",
          alignSelf:
            item?.senderId === authCtx?.userData?._id
              ? "flex-end"
              : "flex-start",
          elevation: 1,
          shadowOpacity: 0.3,
        }}
      >
        {item?.senderId !== authCtx?.userData?._id && (
          <Image
            style={{ height: 40, width: 40, marginRight: 10 }}
            source={{ uri: userLogo }}
          />
        )}
        <Text
          style={{
            fontSize: 15,
            color: "#36393c",
            marginRight: item?.senderId === authCtx?.userData?._id ? 60 : 50,
          }}
        >
          {item.message}
        </Text>

        <Text
          style={{
            position: "absolute",
            fontSize: 12,
            color: "grey",
            bottom: 4,
            right: 5,
          }}
        >
          {moment(item.createdAt).format("hh:mm a")}
        </Text>
      </View>
    );
  };
  return (
    <View>
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
          <ActivityIndicator
            color="#80c6ff"
            size={50}
            style={{ height: "90%" }}
          />
        ) : (
          <View style={{ height: Dimensions.get("screen").height *0.9 ,position:"absolute",bottom:80,right:0,left:0}}>
            <FlatList
               
              data={chatList}
              renderItem={renderItem}
              inverted={true}
              
            />
          </View>
        )}
        <TextInput
          value={newMessage}
          style={{
            backgroundColor: "white",
            height: 60,
            borderRadius: 50,
            position: "absolute",
            bottom: 10,
            right: 10,
            left: 10,
            paddingHorizontal: 25,
            fontSize: 18,
          }}
          cursorColor={"#80c6ff"}
          placeholder="Type a message..."
          onChangeText={(text) => {
            setNewMessage(text);
          }}
        />
        <Pressable
          onPress={sendChat}
          style={{
            position: "absolute",
            bottom: 17,
            right: 20,
            padding: 10,
            backgroundColor: "#e0e0e0d1",
            borderRadius: 50,
          }}
        >
          <Icon2 name="paper-plane" size={25} />
        </Pressable>
      </ImageBackground>
    </View>
  );
};

export default ChatSection;
