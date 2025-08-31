import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { surl, userid } from "../Login";

function Result() {
    const data:any = useLocalSearchParams();
    const ansdata:any=JSON.parse(data.ansdata);
    const questions=JSON.parse(data.questions);
    let [correct,setCorrect]=useState(0);
    const percentage = (correct/20)*100;
    const incorrect = 20-correct;
    const total = 20;
    const route=useRouter();

    useEffect(()=>{
        let ch:number =0;
        for(let i=0;i<=ansdata.length-1;i++)
        {
            if(ansdata[i].marks)
            {
                ch+=1;
               
            }
        }
        axios.get(`${surl}/addquizdata/${ch}/${userid}`);
        setCorrect(ch);


    },[]);

    return (
        <LinearGradient colors={["#d0bcb2ff", "#d1a79181"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ height: "100%" ,alignItems:"center",justifyContent:"center"}}>
            <View style={styles.container}>
                <Text style={styles.title}>Score</Text>

                <View style={styles.iconWrapper}>
                    <Ionicons name="checkmark" size={60} color="#2ecc71" />
                </View>

                <Text style={styles.percentage}>{percentage}%</Text>

                <View style={styles.stats}>
                    <Text style={styles.statText}>{correct} correct</Text>
                    <Text style={styles.statText}>{incorrect} incorrect</Text>
                    <Text style={styles.statText}>{total} total</Text>
                </View>
                <TouchableOpacity style={{margin:10}} onPress={()=>{
                    route.push({pathname:"/components/AnsSheet",params:{questions:JSON.stringify(questions),ansdata:JSON.stringify(ansdata)}as never});
                }}>
                    <Text style={{color:"gold",fontSize:18,fontWeight:600}}>
                        more Info...
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#90420bff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        width:"80%",
        borderRadius:16,
        borderColor:'#0d1c37ff',
        borderWidth:1
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30,
    },
    iconWrapper: {
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 20,
        marginBottom: 20,
    },
    percentage: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30,
    },
    stats: {
        alignItems: 'center',
    },
    statText: {
        fontSize: 20,
        color: '#fff',
        marginVertical: 4,
    },
});
export default Result;
