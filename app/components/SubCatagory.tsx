import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

function SubCatagory() {
    const data: any = useLocalSearchParams();
    const route=useRouter()
    
    function quizStart(name:string,type:string)
    {
           route.push({
            pathname:"/components/QuizWindow",
            params:{
                name:name,
                type:type
            }
           });
    }
    
    

    return (
        <LinearGradient colors={['#faf2eeff', '#d1a79181']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
            style={{ height: "100%" }}>
            <View>
                <Text style={{ fontSize: 25, fontWeight: 700, margin: 4, color: "#260a75ff" }}>
                    {
                        data.name + "!"
                    }
                </Text>
            </View>
            <FlatList
                data={(data.st)?data.st.split(","):null}
                keyExtractor={(x) => (x)}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => {quizStart(item,data.name)}}>
                            <View style={{
                                backgroundColor: "#ebe1e1ff", margin: 5, marginLeft: 20, marginRight: 20, padding: 15, borderRadius: 10,
                                borderColor: "#212121ff", borderWidth: 1
                            }}>
                                <View style={{ marginRight: 10 }}>
                                    <Ionicons name={data.icon} style={{ fontSize: 25, fontWeight: 600 }} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 20, fontWeight: 600 }}>{item}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />

        </LinearGradient>
    )
}
export default SubCatagory;