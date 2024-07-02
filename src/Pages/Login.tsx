import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import React, { useContext, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-paper";
import { ipConfig } from "../../Core/ipConfig";
import axios from "axios";
import { AuthContext } from "../store/context/auth-context";

const Login = ({ navigation }: any) => {
  const authCtx = useContext(AuthContext);
  const background_image_1 = require("../../assets/BackGround.jpg");
  const [userData, setUserData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [isLoading, setIsloading] = useState(false);
  const [visible, setvisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const [validation,setValidation]=useState({phoneNumber:"",password:"",err:""})

  const handleLogin = async () => {
    setIsloading(true);

    try {
      const res = await axios.post(`${ipConfig}/auth/logIn`, userData);

      
        authCtx.saveToken(res?.data?.token);
        authCtx.updateUserData(res?.data?.user);
        navigation.navigate('blankPage')
       
    } catch (err:any) {
       
      console.log(err,"error");
      setValidation({...validation,err:err.response.data.error})
      setTimeout(() => {
        setValidation({...validation,err:""})
      },3000)
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
            bottom: 100,
            left: 30,
            right: 30,
            paddingVertical: 20,
            borderRadius: 10,
            elevation: 5,
            gap: 20,
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
              LogIn
            </Text>
          </View>

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
          {validation.err&& (
            <Text style={{ color: "red", marginLeft:30 }}>{validation.err}</Text>
          )}
          <Button
            mode="contained"
            buttonColor="#ffd64f"
            style={{
              borderRadius: 10,
              paddingVertical: 6,
              marginHorizontal: 25,

              borderColor: "black",
              marginBottom: 15,
            }}
            onPress={() => handleLogin()}
            loading={isLoading}
          >
            LogIn
          </Button>
        </View>
        
      </ImageBackground>
    </View>
  );
};

export default Login;
