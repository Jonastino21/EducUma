import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, AppState } from "react-native";
import axios, { AxiosError } from 'axios';
import "./../../global.css";
import { AppContext } from "../AppContext";
interface RegistrationInfo {
  email: string;
  password: string;
}


const LoginScreen = ({ navigation }) => {
  // États pour email et mot de passe
  const [registationState, setRegistrationState] = useState<RegistrationInfo>({
    email: "",
    password: ""
  });
  const { state, setState } = useContext(AppContext);
  // Fonction pour mettre à jour l'état des champs
  const handleInputChange = (field: keyof RegistrationInfo, value: string) => {
    setRegistrationState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  // Fonction pour gérer la connexion
  const handleLogin = async () => {
    const { email, password } = registationState;

    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    const apiUrl = 'http://192.168.1.188:8080/auth/login';

try {
      const response = await axios.post(apiUrl, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Réponse de l\'API:', response.data);
      setState((prev: any) => ({ ...prev, user: {  userId: response.data.id,
        userName: response.data.name,
        userPhoto: response.data.picture,
        school:response.data.school,
        department:response.data.department,
        level: response.data.level,
        userGroup:response.data.chatGroups}}))
      navigation.navigate("Home");
      Alert.alert('Succès', 'Connexion réussie !');
      navigation.navigate('Home');
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        Alert.alert('Une erreur est survenue.');
      } else {
      
        Alert.alert('Erreur', 'Impossible de se connecter au serveur.');
      }
    }
  };
 
 

  return (
    <View className="flex-1 justify-center bg-gray-100 px-5">
      <Text className="text-center text-2xl font-bold mb-6">Connexion</Text>
      <Image
        source={require("./../../assets/images/logo_ok.png")} // Remplacez par le chemin de votre image
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
        value={registationState.email}
        onChangeText={(value) => handleInputChange('email', value)}
      />
      <TextInput
        className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
        placeholder="Mot de passe"
        secureTextEntry
         value={registationState.password}
        onChangeText={(value) => handleInputChange('password', value)}
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
