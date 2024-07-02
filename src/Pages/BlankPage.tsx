import { View, Text, Modal,Image,ImageBackground } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../store/context/auth-context';

const BlankPage = () => {
   const authCtx=useContext(AuthContext)
   const background_image_1 = require("../../assets/BackGround.jpg");
    useEffect(()=>{
        setTimeout(() => {
            authCtx.updateAuthentication(true);
        }, 3000); // 2 seconds
      }, []);
    console.log(authCtx.userData,"data")
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
     <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => {}}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 22,
               marginHorizontal:25
            }}
          >
            <View
              style={{
                margin: 20,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 35,
                alignItems: "center",
                shadowColor: "#000",
               width: "100%",
              }}
            >
              <Image style={{height:80,width:80}} source={require("../../assets/success.png")}/>
              <Text>
                Account Logged in sucessfully
              </Text>
              <Text style={{fontSize:18, marginTop:25}}>
                Welcome, {authCtx?.userData?.fullName} 
              </Text>
              <Text style={{fontSize:15,width:"80%",textAlign:"center",color:"grey",marginTop:5}}>
              You can now chat with your friends and family
              </Text>
            </View>
          </View>
        </Modal>
        </ImageBackground>
    </View>
  )
}

export default BlankPage