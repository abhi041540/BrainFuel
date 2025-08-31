import { Stack } from "expo-router";
import { Image, View } from "react-native";

export default function RootLayout() {
  return <Stack screenOptions={{
    headerStyle:{
      backgroundColor:"#db5f0cff"
    },
    statusBarStyle:"light",
    headerTitleStyle:{
      color:"white",
      fontSize:25,
    },
    headerTitleAlign: 'center',
    headerTitle:()=>(
      <View>
        <Image
            source={require('./images/logo.png')}
            style={{ width: 180, height: 70, resizeMode: 'contain',margin:10 }}
          />
      </View>
    )
  
    }}>
    
  <Stack.Screen name="Login"/>
  <Stack.Screen name="Forgotpassword" options={{ title:"Success!",animation:"slide_from_right"}}/>
  <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
  <Stack.Screen name="./components/SubCatagory" options={{title:"Select Quiz",animation:"slide_from_right"}}/>
  <Stack.Screen name="./components/QuizWindow" options={{title:"Quiz",animation:"slide_from_right"}}/>
  <Stack.Screen name="./components/Result" options={{title:"Score",animation:"slide_from_right"}}/>
  <Stack.Screen name="./components/AnsSheet" options={{title:"Result",animation:"slide_from_right"}}/>

  </Stack>;
}
