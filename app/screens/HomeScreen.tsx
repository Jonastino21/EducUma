import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import AnalyticsDashboard from "./AccueilDash";
import CoursModule from "./CourScreen";
import LinkedInPost from "./PostDash";

const CoursScreen = () => (
  <View className="flex-1 justify-center items-center bg-gray-100">
    <CoursModule />

  </View>
);

const CommunicationScreen = () => (
  <View className="flex-1 justify-center items-center bg-gray-100">
    <Text className="text-lg font-bold">Communication</Text>
  </View>
);

const Home = () => (
  <ScrollView className="flex-1 bg-gray-100">
    <AnalyticsDashboard />
    <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 10 }} />
    <LinkedInPost />
  </ScrollView>
);

const SuiviScreen = () => (
  <View className="flex-1 justify-center items-center bg-gray-100">
  </View>
);

const Tab = createBottomTabNavigator();

export default function App() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Cours") {
              iconName = "book-outline";
            } else if (route.name === "Communication") {
              iconName = "chatbubbles-outline";
            } else if (route.name === "Suivi") {
              iconName = "analytics-outline";
            } else if (route.name === "Accueil") {
              iconName = "home-outline";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#1E90FF",
          tabBarInactiveTintColor: "gray",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#1E7FCB",
          },
          headerTitle: "",
          headerRight: () => (
            <View className="flex-row items-center gap-3 pr-4">
              <TouchableOpacity onPress={() => navigation.navigate("MessageList")}>
                <Icon name="chatbubbles-outline" size={25} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log("Notifications!")}>
                <Icon name="notifications-outline" size={25} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
                <Icon name="person-circle-outline" size={40} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View>
              
              <Text className="text-xl p-4 font-bold text-white">
                <Text style={{ color: "orange" }}>E</Text>
                duc
                <Text style={{ color: "orange" }}>U</Text>
                ma
              </Text>
            </View>
          ),
        })}
      >
        <Tab.Screen name="Accueil" component={Home} />
        <Tab.Screen name="Cours" component={CoursScreen} />
        <Tab.Screen name="Suivi" component={SuiviScreen} />
      </Tab.Navigator>

      {/* Profile menu modal */}
      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <Pressable
          className="flex-1  bg-opacity-50"
          onPress={() => setIsMenuVisible(false)}
        >
          <View className="absolute top-14 right-4 bg-white rounded-lg shadow-lg p-4 w-48">
            <TouchableOpacity
              className="py-2"
              onPress={() => {
                console.log("Mon profil");
                setIsMenuVisible(false);
              }}
            >
              <Text className="text-black text-sm font-medium">Mon profil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-2"
              onPress={() => {
                console.log("Paramètres");
                setIsMenuVisible(false);
              }}
            >
              <Text className="text-black text-sm font-medium">Paramètres</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-2"
              onPress={() => {
                console.log("Se déconnecter");
                setIsMenuVisible(false);
              }}
            >
              <Text className="text-red-500 text-sm font-medium">
                Se déconnecter
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
