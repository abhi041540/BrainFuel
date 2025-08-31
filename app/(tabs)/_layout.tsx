import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { userid } from "../Login";

function TabLayout()
{
    let userid1: String=((userid.length>6)?userid.slice(0,6)+"...":userid).toUpperCase();
 return(
    <Tabs screenOptions={
        {
            tabBarActiveTintColor:"#db5f0cff",
            tabBarInactiveTintColor:"#5c5c5cff",
            headerStyle:{
                backgroundColor:"#db5f0cff"
            },
            headerTitleStyle:{
                color:"white",
                fontWeight:700
            },
            tabBarLabelStyle:{
                fontSize:15,
                fontWeight:600
            },
            tabBarStyle:{
                height:80,
            },
        }
    }>
        <Tabs.Screen name="home" options={{
            title:"Home",
            tabBarIcon:({color,size})=>{
                return(<Ionicons name="home" size={size} color={color}/>)
            }
        }}/>

        <Tabs.Screen name="profile" options={{
            title:""+userid1,
            tabBarIcon:({color,size})=>{
                return(<Ionicons name="person" size={size} color={color}/>)
            }
        }}/>
    </Tabs>
 );
}
export default TabLayout;