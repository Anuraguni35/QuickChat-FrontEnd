import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const WelcomePage = ({navigation}:any) => {
  const background_image_1 = require("../../assets/BackGround.jpg");
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
        <View>
          <Text
            style={{
              fontSize: 25,
              padding: 20,
              fontWeight: "500",
              alignSelf: "center",
            }}
          >
            Welcome to QuickChat!!!!
          </Text>
          <Image
            style={{ width: "100%", height: "45%", marginTop: "10%" }}
            resizeMode="contain"
            source={require("../../assets/WelcomeLogo.png")}
          />
        </View>
        <View
          style={{
            backgroundColor: "white",
            position: "absolute",
            bottom: 40,
            left: 30,
            right: 30,
            paddingVertical: 60,
            borderRadius: 10,
            elevation:5
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "15%",
            }}
          >
            <Text style={{ fontSize: 30, marginBottom: 10, color: "#242931" }}>
              Hello Again!!!
            </Text>
            <Text
              style={{
                fontSize: 20,
                width: "80%",
                textAlign: "center",
                color: "#acb3bc",
              }}
            >
              Welcome to QuickChat, You've been missed !!!!
            </Text>
          </View>
          <Button
            mode="contained"
            buttonColor="#80c6ff"
            style={{
              borderRadius: 10,
              paddingVertical: 6,
              marginHorizontal: 25,
              
              borderColor: "black",
              marginBottom: 15,
            }}
            onPress={()=>{navigation.navigate("Signup")}}
          >
            SignUp
          </Button>
          <Button
            style={{
              borderRadius: 10,
              paddingVertical: 6,
              marginHorizontal: 25,
              
              borderColor: "black",
              marginBottom: 15,
            }}
            mode="contained"
            buttonColor="#ffd64f"
            onPress={()=>{navigation.navigate("Login")}}
          >
            LogIn
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomePage;
