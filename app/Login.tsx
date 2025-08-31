import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const surl:string = Process.env.SURL;
let userid: String = "";
const avatar: any = {
  width: 100,
  height: 100,
  borderRadius: 50,
  borderWidth: 3,
  borderColor: "#333"
};

const avatarContainer: any = {
  alignItems: "center",
};

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userid1, setUserid] = useState("");
  const nav = useRouter();


  useEffect(() => {
    userid = userid1;
  }, [userid1]);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const value = await AsyncStorage.getItem("islogin");
        if (value && value!="") {
          const parsed = JSON.parse(value);
          setUserid(parsed["email"]);
          nav.push("/(tabs)/home");
          // console.log("already logedin");
        } else {
          // console.log("No login data found");
        }
      } catch (err) {
        console.error("Error reading AsyncStorage:", err);
      }
    };

    checkLogin();
  }, []);


  async function loginpress() {
    const email1 = email.trim();
    const password1 = password.trim();

    if (email1.length <= 0 || password1.length <= 0) {
      setEmail("");
      setPassword("");
      Alert.alert("Wrong Info..", "Enter Valid User Information!");
      return;
    }

    try {
      const resp = await axios.post(`${surl}/login`, { email: email1, password: password1 });

      if (resp.data === 'yes') {
        setEmail("");
        setPassword("");
        setUserid(email1);
        await AsyncStorage.setItem("islogin", JSON.stringify({ email: email1 }));
        nav.push('/(tabs)/home');
      } else if (resp.data === "yes1") {
        setEmail("");
        setPassword("");
        setUserid(email1);
        Alert.alert("New User", "Profile Created Successfully!");
        await AsyncStorage.setItem("islogin", JSON.stringify({ email: email1 }));
        nav.push('/(tabs)/home');
      } else if (resp.data === "yes2") {
        setEmail("");
        setPassword("");
        setUserid(email1);
        Alert.alert("Try Again!", "Wrong Password Please Try Again!");
      } else {
        setEmail("");
        setPassword("");
        Alert.alert("Wrong Info..", "Wrong User Information Please Try Again!");
      }
    } catch (e) {
      console.error("Login error:", e);
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#f0e7e3ff", height: "100%" }}>
      <View >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View style={avatarContainer}>
            <Image
              source={require("./images/avatar.png")}
              style={avatar}
            />
          </View>
          <View>
            <Text style={{ color: "#111", fontFamily: "sans-serif", fontSize: 40, fontWeight: 700, display: "flex" }}>Login</Text>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center", width: "100%", marginTop: 30 }}>
           <View>
            <Text style={{ color: "#111", fontFamily: "sans-serif", fontSize: 20, fontWeight: 700, display: "flex" }}>UserId</Text>
          </View>
            <TextInput placeholder='Enter Your Userid' value={email} onChangeText={(text) => { setEmail(text) }} style={{
              backgroundColor: "white", padding: 20, width: "80%", borderRadius: 10, borderWidth: 1,
              borderColor: '#403f3d8f', borderStyle: 'solid', fontWeight: 600, fontSize: 18
            }} />
          </View>
          <View style={{ alignItems: "center", justifyContent: "center", width: "100%", marginTop: 20 }}>
            <View>
            <Text style={{ color: "#111", fontFamily: "sans-serif", fontSize: 20, fontWeight: 700, display: "flex" }}>Password</Text>
          </View>
            <TextInput secureTextEntry={true} placeholder='Enter Your Password' onChangeText={(text) => { setPassword(text) }} value={password} style={{
              backgroundColor: "white", padding: 20, width: "80%", borderRadius: 10, borderWidth: 1,
              borderColor: '#403f3d8f', borderStyle: 'solid', fontWeight: 600, fontSize: 18,color:"#111"
            }} />
          </View>
          <View style={{ alignItems: "center", justifyContent: "center", width: "100%", marginTop: 20 }}>
            <TouchableOpacity onPress={loginpress} style={{
              alignItems: "center", justifyContent: "center", backgroundColor: "#e9640bff", padding: 20, width: "80%", borderRadius: 15, borderWidth: 1,
              borderColor: '#ffffff8f', borderStyle: 'solid'
            }}>
              <Text style={{ fontWeight: 600, fontSize: 24, color: "white" }}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center", width: "100%", marginTop: 20 }}>
            <TouchableOpacity onPress={() => { nav.navigate('Forgotpassword' as never) }} style={{ alignItems: "center", justifyContent: "center", padding: 8, width: "80%" }}>
              <Text style={{ fontWeight: 400, fontSize: 24, color: "#484747ff" }}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
export { surl, userid };

