import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";

import "./../../global.css";

const LoginScreen = ({ navigation }) => {
  // États pour email et mot de passe
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Identifiants de test
  const testEmail = "test@educuma.mg";
  const testPassword = "test123";

  // Fonction pour gérer la connexion
  const handleLogin = () => {
    if (email === testEmail && password === testPassword) {
      Alert.alert("Succès", "Connexion réussie !");
      navigation.navigate("Home"); // Redirige vers la page d'accueil
    } else {
      Alert.alert("Erreur", "Email ou mot de passe incorrect.");
    }
  };

  return (
    <View className="flex-1 justify-center bg-gray-100 px-5">
      <Text className="text-center text-2xl font-bold mb-6">Connexion</Text>
      <Image
        source={require("./../../assets/images/educuma.png")} // Remplacez par le chemin de votre image
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          marginBottom: 20,
          borderRadius: 50,
        }}
      />
      <TextInput
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity className="bg-blue-500 p-4 rounded-lg mb-4" onPress={handleLogin}>
        <Text className="text-center text-white font-semibold">Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text className="text-center text-blue-500 font-semibold">S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
