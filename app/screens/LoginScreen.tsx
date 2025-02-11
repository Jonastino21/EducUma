import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import './../../global.css';

const LoginScreen = ({navigation}) => {
  return (
    <View className="flex-1 justify-center bg-gray-100 px-5">
      <Text className="text-center text-2xl font-bold mb-6">Connexion</Text>
      <TextInput className="bg-white p-3 rounded-lg border border-gray-300 mb-4" placeholder="Email" keyboardType="email-address" />
      <TextInput className="bg-white p-3 rounded-lg border border-gray-300 mb-4" placeholder="Mot de passe" secureTextEntry />
      <TouchableOpacity className="bg-blue-500 p-4 rounded-lg mb-4"
      onPress={() => navigation.navigate('Home')}
      >
      <Text className="text-center text-white font-semibold">Se connecter</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text className="text-center text-blue-500 font-semibold"> S'inscrire</Text>
        
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
