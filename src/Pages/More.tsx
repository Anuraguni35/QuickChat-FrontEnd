import { View, Text, ImageBackground, Image } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../store/context/auth-context";
import moment from "moment";
import { Button } from "react-native-paper";

const More = ({ navigation }: any) => {
  const background_image_1 = require("../../assets/BackGround.jpg");
  const authCtx = useContext(AuthContext);
  console.log(authCtx.userData);
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
        <Image
          style={{
            height: 200,
            width: 200,
            alignSelf: "center",
            marginTop: "15%",
            marginBottom: "10%",
          }}
          source={{ uri: authCtx?.userData?.profilePic }}
        />
        <View
          style={{
            backgroundColor: "white",
            padding: 30,
            marginHorizontal: 40,
            marginVertical: 25,
            borderRadius: 10,
            elevation: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 0.5,
              borderBottomColor: "#e0e0e0",
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "grey" }}>
              Name:
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "grey" }}>
              {authCtx?.userData?.fullName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 0.5,
              borderBottomColor: "#e0e0e0",
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "grey" }}>
              Phone Number:{" "}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "grey" }}>
              {" "}
              {authCtx?.userData?.phoneNumber}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 0.5,
              borderBottomColor: "#e0e0e0",
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "grey" }}>
              User Name:{" "}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "grey" }}>
              {" "}
              {authCtx?.userData?.username}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomWidth: 0.5,
              borderBottomColor: "#e0e0e0",
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "grey" }}>
              Gender:{" "}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "grey" }}>
              {" "}
              {authCtx?.userData?.gender}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",

              paddingVertical: 5,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "grey" }}>
              User Created on :{" "}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "grey" }}>
              {" "}
              {moment(authCtx?.userData?.createdAt).format("DD-MMM-YYYY")}
            </Text>
          </View>
        </View>
        <Button
          mode="elevated"
          buttonColor="#80c6ff"
          textColor="white"
          style={{
            position: "absolute",
            bottom: 40,
            left: 20,
            right: 20,
            borderRadius: 10,
            paddingVertical: 6,
          }}
          onPress={()=>{authCtx.logOut()}}
        >
          LogOut
        </Button>
      </ImageBackground>
    </View>
  );
};

export default More;
