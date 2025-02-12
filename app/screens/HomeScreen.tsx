import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import AnalyticsDashboard from "./AccueilDash";


const CoursScreen = () => (
  <View className="flex-1 justify-center items-center bg-gray-100">
    <Text className="text-lg font-bold">Gestion des Cours</Text>
  </View>
);

const CommunicationScreen = () => (
  <View className="flex-1 justify-center items-center bg-gray-100">
    <Text className="text-lg font-bold">Communication</Text>
  </View>
);

const Home = () => (
  <View className="flex-1 bg-gray-100">
  <AnalyticsDashboard />
</View>
);

const SuiviScreen = () => (
  <View className="flex-1 justify-center items-center bg-gray-100">
    <Text className="text-lg font-bold">Suivi Académique</Text>
  </View>
);

// Création du Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            // Associer des icônes aux noms des routes
            if (route.name === "Cours") {
              iconName = "book-outline";
            } else if (route.name === "Communication") {
              iconName = "chatbubbles-outline";
            } else if (route.name === "Suivi") {
              iconName = "analytics-outline";
            }
            else if (route.name === "Accueil") {
            iconName = "home-outline";
          }

            // Retourner l'icône Ionicons
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#1E90FF", // Couleur active
          tabBarInactiveTintColor: "gray", // Couleur inactive
          headerShown: false, // Cacher les headers
        })}
      >
       <Tab.Screen name="Accueil" component={Home} />
        <Tab.Screen name="Communication" component={CommunicationScreen} />
        <Tab.Screen name="Cours" component={CoursScreen} />
        <Tab.Screen name="Suivi" component={SuiviScreen} />
      </Tab.Navigator>
  );
}
