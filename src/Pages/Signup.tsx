import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Button, Divider, Menu } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { ipConfig } from "../../Core/ipConfig";

const Signup = ({ navigation }: any) => {
  const background_image_1 = require("../../assets/BackGround.jpg");
  const [userData, setUserData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    phoneNumber: "",
  });
  const [isLoading, setIsloading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [visible, setvisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleSignup = async () => {
    setIsloading(true);
    try {
      const res = await axios.post(`${ipConfig}/auth/signUp`, userData);
      console.log(res, "res");
      Alert.alert(
        "Registered successful!!!",
        "new user have created sucessfully,please go to login page and login again",
        [
          {
            text: "Go Back",
            style: "default",
            onPress: () => navigation.goBack(),
          },
        ],
        { cancelable: false }
      );
    } catch (err: any) {
      console.log(err.response)
      // alert(err.response.data.message);
    } finally {
      setIsloading(false);
    }
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
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable
              style={{
                marginLeft: 20,
                padding: 5,
                borderRadius: 25,
                backgroundColor: "#d4d4d4e0",
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name="chevron-back" size={25} />
            </Pressable>

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
          </View>
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
            paddingVertical: 20,
            borderRadius: 10,
            elevation: 5,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              // marginBottom: 80,
            }}
          >
            <Text style={{ fontSize: 30, marginBottom: 10, color: "#242931" }}>
              SignUp
            </Text>
          </View>
          <TextInput
            placeholder="Enter full Name"
            cursorColor={"#80c6ff"}
            style={{
              borderBottomWidth: 1,
              marginBottom: 10,
              marginHorizontal: 28,
              height: 40,
              borderColor: "grey",
            }}
            onChangeText={(text) => {
              setUserData({ ...userData, fullName: text });
            }}
          />
          <TextInput
            placeholder="Enter User Name"
            cursorColor={"#80c6ff"}
            style={{
              borderBottomWidth: 1,
              marginBottom: 10,
              marginHorizontal: 28,
              height: 40,
              borderColor: "grey",
            }}
            onChangeText={(text) => {
              setUserData({ ...userData, username: text });
            }}
          />
          <TextInput
            placeholder="Enter Phone Number"
            cursorColor={"#80c6ff"}
            style={{
              borderBottomWidth: 1,
              marginBottom: 10,
              marginHorizontal: 28,
              height: 40,
              borderColor: "grey",
            }}
            onChangeText={(text) => {
              setUserData({ ...userData, phoneNumber: text });
            }}
            textContentType="telephoneNumber"
            keyboardType="numeric"
            maxLength={10}
          />
          <Menu
            visible={menuVisible}
            onDismiss={() => {
              setMenuVisible(false);
            }}
            // anchorPosition="top"
            contentStyle={{
              backgroundColor: "white",
              paddingVertical: 15,
              borderRadius: 10,
              width: 300,
              marginLeft: 25,
            }}
            anchor={
              <Pressable
                style={{
                  borderBottomWidth: 1,
                  marginBottom: 10,
                  marginHorizontal: 28,
                  height: 40,
                  borderColor: "grey",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => {
                  setMenuVisible(true);
                }}
              >
                <Text style={{ color: "grey" }}>
                  {userData.gender == "" ? "Select Gender" : userData.gender}
                </Text>
              </Pressable>
            }
          >
            <Menu.Item title="--------Select gender-------" />
            <Menu.Item
              onPress={() => {
                setUserData({ ...userData, gender: "male" });
                setMenuVisible(false);
              }}
              title="male"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                setUserData({ ...userData, gender: "female" });
                setMenuVisible(false);
              }}
              title="female"
            />
          </Menu>
          <View style={{ flexDirection: "row", width: "100%" }}>
            <TextInput
              placeholder="Enter Password"
              cursorColor={"#80c6ff"}
              style={{
                borderBottomWidth: 1,
                marginBottom: 10,
                marginHorizontal: 28,
                height: 40,
                borderColor: "grey",
                width: "84%",
              }}
              onChangeText={(text) => {
                setUserData({ ...userData, password: text });
              }}
              secureTextEntry={!visible.password}
            />
            <TouchableOpacity
              onPress={() => {
                setvisible({ ...visible, password: !visible.password });
              }}
              style={{ position: "absolute", right: 40, top: 10 }}
            >
              <Icon
                name={visible.password ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", width: "100%" }}>
            <TextInput
              placeholder="Confirm Password"
              cursorColor={"#80c6ff"}
              style={{
                borderBottomWidth: 1,
                marginBottom: 10,
                marginHorizontal: 28,
                height: 40,
                borderColor: "grey",
                width: "84%",
              }}
              onChangeText={(text) => {
                setUserData({ ...userData, confirmPassword: text });
              }}
              textContentType="password"
              secureTextEntry={!visible.confirmPassword}
            />
            <TouchableOpacity
              onPress={() => {
                setvisible({
                  ...visible,
                  confirmPassword: !visible.confirmPassword,
                });
              }}
              style={{ position: "absolute", right: 40, top: 10 }}
            >
              <Icon
                name={
                  visible.confirmPassword ? "eye-off-outline" : "eye-outline"
                }
                size={24}
                color="gray"
              />
            </TouchableOpacity>
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
            onPress={() => handleSignup()}
            loading={isLoading}
          >
            SignUp
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Signup;
