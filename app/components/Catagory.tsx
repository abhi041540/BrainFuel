import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";


function Catagory(param: any) {

   const route=useRouter();
    function subQuiz(data:any)
    {
       route.push({pathname:"components/SubCatagory",params:data} as never);
    }

    return (
        <View>
            <FlatList
                data={param.data}
                keyExtractor={(x) => (x.name)}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={()=>{subQuiz(item)}}>
                            <View style={{
                                backgroundColor: "#ebe1e1ff", margin: 5, marginLeft: 20, marginRight: 20, padding: 15, borderRadius: 10,
                                borderColor: "#212121ff", borderWidth: 1
                            }}>
                                    <View style={{marginRight:10}}>
                                        <Ionicons name={item.icon} style={{fontSize:25,fontWeight:600}} />
                                    </View>
                                    <View>
                                        <Text  style={{fontSize:20,fontWeight:600}}>{item.name}</Text>
                                    </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}
export default Catagory;

