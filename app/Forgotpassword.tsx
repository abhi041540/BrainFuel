import axios from 'axios';
import { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { surl } from './Login';

export default function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
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
    function loginpress() {
        const email1 = email.trim();
        const password1 = password.trim();
        if (email1.length <= 0 || password1.length <= 0) {
            setEmail("");
            setPassword("");
            Alert.alert("Wrong Info..", "Enter Valid User Information!");
        }
        else {
            axios.post(`${surl}/update/password`, { email: email1, password: password1 }).then((resp) => {

                if (resp.data === "yes") {
                    setEmail("");
                    setPassword("");
                    Alert.alert("Successfully!", "Password Updated Succesfully!");
                }
                else {
                    setEmail("");
                    setPassword("");
                    Alert.alert("Try To Login!", "No User Found!");
                }
            });

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
                        <Text style={{ color: "#111", fontFamily: "sans-serif", fontSize: 40, fontWeight: 700, display: "flex" }}>Forgot password!</Text>
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
                            <Text style={{ color: "#111", fontFamily: "sans-serif", fontSize: 20, fontWeight: 700, display: "flex" }}>New Password</Text>
                        </View>
                        <TextInput secureTextEntry={true}  placeholder='Enter New Password' onChangeText={(text) => { setPassword(text) }} value={password} style={{
                            backgroundColor: "white", padding: 20, width: "80%", borderRadius: 10, borderWidth: 1,
                            borderColor: '#403f3d8f', borderStyle: 'solid', fontWeight: 600, fontSize: 18, color:"#111"
                        }} />
                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center", width: "100%", marginTop: 20 }}>
                        <TouchableOpacity onPress={loginpress} style={{
                            alignItems: "center", justifyContent: "center", backgroundColor: "#e9640bff", padding: 20, width: "80%", borderRadius: 15, borderWidth: 1,
                            borderColor: '#ffffff8f', borderStyle: 'solid'
                        }}>
                            <Text style={{ fontWeight: 600, fontSize: 24, color: "white" }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
