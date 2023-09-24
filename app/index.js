import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Touchable, Animated, Dimensions } from "react-native";
import { useRef, useState } from "react";
import { Stack, useRouter } from "expo-router";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS, icons, images, SIZES } from "../constants";
import { FontAwesome5 } from '@expo/vector-icons'
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { Image } from "react-native";

const Add = require('../assets/icons/plus.png');


const Tab = createBottomTabNavigator();

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const tabOffSetValue = useRef(new Animated.Value(0)).current;

  return (
	
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
          />
          {/* <Popularjobs />
          <Nearbyjobs /> */}
        </View>
      </ScrollView>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
			style:{
				backgroundColor:'white',
				position:"absolute",
				bottom:10,
				marginHorizontal:28,
				height:60,
				borderRadius:10,
				shadowColor:'#000',
				shadowOpacity:'0.06',
				shadowOffset:{
					width:10,
					height:10,
				},
				paddingHorizontal:20,
			}
          }}
        >
          {
            //Tab screen....
          }
          <Tab.Screen name={"Home"} component={HomeScreen} options={{
			tabBarIcon: ({focused}) =>(
				<View style={{
					position:'absolute'
				}}>
					<FontAwesome5
					name="home"
					size={25}
					color={focused ? 'green' : 'gray'}
					></FontAwesome5>
				</View>
			)
		  }}listeners={({Navigation,route})=>({
			tabPress: e=>{
				Animated.spring(tabOffSetValue,{
					toValue: 0,
					useNativeDriver:true
				}).start();
			}
		  })}></Tab.Screen>
          <Tab.Screen name={"Search"} component={SearchScreen} options={{
			tabBarIcon: ({focused}) =>(
				<View style={{
					position:'absolute'
				}}>
					<FontAwesome5
					name="search"
					size={25}
					color={focused ? 'green' : 'gray'}
					></FontAwesome5>

				</View>
			)
		  }}listeners={({Navigation,route})=>({
			tabPress: e=>{
				Animated.spring(tabOffSetValue,{
					toValue:getWidth(),
					useNativeDriver:true
				}).start();
			}
		  })}></Tab.Screen>
		  
		  <Tab.Screen name={"ActionButton"} component={EmptyScreen} options={{
          tabBarIcon: ({ focused }) => (

            <TouchableOpacity>
				<View style={{
					width:55,
					height:55,
					backgroundColor:"red",
					borderRadius: 30,
					justifyContent:'center',
					alignItems:'center',
					marginBottom:60
				}}>
                <Image source={Add} style={{
					width:22, 
					height: 22,
					tintColor:"white", 
				}}></Image>
              </View>
            </TouchableOpacity>
          )
        }}></Tab.Screen>


          <Tab.Screen
            name={"Notification"}
            component={NotificationScreen} options={{
				tabBarIcon: ({focused}) =>(
					<View style={{
						position:'absolute'
					}}>
						<FontAwesome5
						name="bell"
						size={25}
						color={focused ? 'green' : 'gray'}
						></FontAwesome5>
					</View>
				)
			  }}listeners={({Navigation,route})=>({
				tabPress: e=>{
					Animated.spring(tabOffSetValue,{
						toValue:getWidth() * 3,
						useNativeDriver:true
					}).start();
				}
			  })}
          ></Tab.Screen>

		  
          <Tab.Screen name={"Settings"} component={SettingsScreen} options={{
			tabBarIcon: ({focused}) =>(
				<View style={{
					position:'absolute'
				}}>
					<FontAwesome5
					name="user-alt"
					size={25}
					color={focused ? 'green' : 'gray'}
					></FontAwesome5>
				</View>
			)
		  }}listeners={({Navigation,route})=>({
			tabPress: e=>{
				Animated.spring(tabOffSetValue,{
					toValue:getWidth() * 4,
					useNativeDriver:true
				}).start();
			}
		  })}></Tab.Screen>
        </Tab.Navigator>
		<Animated.View style={{
        width: getWidth() - 20,
        height: 2,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 71,
        // Horizontal Padding = 20...
        left: 50,
        borderRadius: 20,
        transform: [
          { translateX: tabOffSetValue }
        ]
      }}>

      </Animated.View>
      </NavigationContainer>
	  </SafeAreaView>

  );
};


function getWidth() {
	let width = Dimensions.get("window").width
  
	// Horizontal Padding = 20...
	width = width - 80
  
	// Total five Tabs...
	return width / 5
  }

function EmptyScreen() {
	return (
	  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
	  </View>
	);
  }
function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
	 
    </View>
  );
}
function NotificationScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notification!</Text>
    </View>
  );
}
function SearchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Search!</Text>
    </View>
  );
}

export default Home;
