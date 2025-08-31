import data1 from '@/quiz_data';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, SafeAreaView, Text, View } from "react-native";
import Catagory from '../components/Catagory';


function Home() {
  return (
    <SafeAreaView>
      <LinearGradient colors={['#faf2eeff', '#d1a79181']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}
        style={{ height: "100%" }}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: 700, margin: 10, color: "#260a75ff" }}>Select Quiz!</Text>
        </View>
        <FlatList
          data={data1}
          keyExtractor={(x) => (x.name)}
          renderItem={({ item }) => {
            return (
              <View>
                <View>
                  <Text style={{ fontSize: 19, fontWeight: 600, margin: 15, color: "#1c0952ff" }}>{item.name}</Text>
                </View>
                <View>
                  <Catagory data={item.data}/>
                </View>
              </View>
            )
          }}
        />
      </LinearGradient>
    </SafeAreaView>
  )
}
export default Home;