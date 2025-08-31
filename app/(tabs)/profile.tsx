import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProgressBar from "../components/ProgressBar";
import { surl, userid } from "../Login";

function Profile() {
   const[total,setTotal]=useState(0);
   const[score,setScore]=useState(0);
   const route=useRouter();
   async function logout()
   {
     await AsyncStorage.setItem("islogin","");
     route.push("/Login");
   }
   
   async function deleteaccount()
   {
    await Alert.alert("Remove Profile?","Are you sure this will remove all your data and credentials!",[
      {text:"cancel",style:"cancel"},
      {text:" Confirm",style:"destructive",onPress:async()=>{
                 
          await axios.get(`${surl}/deleteaccount?userid=${userid}`).then((resp)=>{

            if(resp.data=="yes")
            {
                  AsyncStorage.setItem("islogin","");
                  route.push("/Login");
            }
            else
            {
              Alert.alert("Try Again!","Somthing Went Wrong");
            }

          });

      }}
     ])
   }
   useEffect(()=>{
     axios.get(`${surl}/get/quizdata/${userid}`).then((resp)=>{
               setTotal(resp.data.total);
               setScore(resp.data.score);
     });
   })
  return (
    <LinearGradient
      colors={["#faf2eeff", "#d1a79181"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}></Text>
      </View>
      <View style={styles.avatarContainer}>
        <Image
          source={require("../images/avatar.png")}
          style={styles.avatar}
        />
         <View>
            <Text style={styles.userId}>{((userid.length>6)?userid.slice(0,6)+"...":userid).toUpperCase()}</Text>
         </View>
      </View>
      <View style={{margin:20,marginTop:40,alignItems:"center",justifyContent:"center"}}>
        <Text style={{fontSize:25,fontWeight:600,color:"#080f30ff"}}>
          Your Overall Score
        </Text>
      </View>
      <View style={{backgroundColor:"#fff7f7ea",margin:20,marginTop:10,padding:20,borderRadius:20,borderColor:"#464646cb",borderWidth:1,alignItems:"center",justifyContent:"center"}}>
        <View style={{width:"100%"}}>
          <ProgressBar value={score} max={100}/>
        </View>
        <Text style={{fontSize:24,fontWeight:600 ,color:"#1a0f48ff"}}>
          <Text style={{color: "#b8500aff"}}><Ionicons name="reader" size={18} /> Total Quizzes:- </Text>
            {total}
        </Text>
        <Text style={{fontSize:24,fontWeight:600 ,color:"#1a0f48ff"}}>
          <Text style={{color: "#b8500aff"}}><Ionicons name="podium" size={18}/> Avg. Score:- </Text>
            {Math.floor(score)}%
        </Text>
      </View>
      <TouchableOpacity onPress={logout} style={{margin:10,marginLeft:40,marginRight:40,backgroundColor:"#b8500aff",padding:15,borderRadius:15,borderColor:"white",borderWidth:1,alignItems:"center",justifyContent:"center"}}>
        <Text style={{fontWeight:600,fontSize:25,color:"white"}}>
          <Ionicons name="log-out-outline" size={28} /> Logout
        </Text>
      </TouchableOpacity>
       <TouchableOpacity onPress={deleteaccount} style={{margin:10,marginLeft:40,marginRight:40,backgroundColor:"#b8500aff",padding:15,borderRadius:15,borderColor:"white",borderWidth:1,alignItems:"center",justifyContent:"center"}}>
        <Text style={{fontWeight:600,fontSize:25,color:"white"}}>
          <Ionicons name="person-remove" size={28} /> Remove Profile
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%"
  },
  header: {
    backgroundColor: "#db5f0cff",
    height: "8%",
    justifyContent: "center",
    paddingLeft: 20
  },
  headerText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold"
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: -40
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#333"
  },
  userId: {
    marginTop:5,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000"
  }
});
