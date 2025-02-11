import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import './../../global.css';

const RegisterStudentScreen = ({navigation}) => {
  // État pour gérer l'ouverture des sections
  const [personalInfoOpen, setPersonalInfoOpen] = useState(false);
  const [academicInfoOpen, setAcademicInfoOpen] = useState(false);

  return (
    <ScrollView className="flex-1 bg-gray-100 px-5">
      <Text className="text-center text-2xl font-bold my-6">Inscription</Text>

      {/* Section Informations Personnelles */}
      <TouchableOpacity
        className="bg-gray-200 p-3 rounded-lg mb-2"
        onPress={() => setPersonalInfoOpen(!personalInfoOpen)}
      >
        <Text className="text-lg font-semibold">Informations personnelles</Text>
      </TouchableOpacity>
      
      {personalInfoOpen && (
        <View>
          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Nom"
          />
          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Prénoms"
          />
          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Mot de passe"
            secureTextEntry
          />
          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Téléphone"
          />
        </View>
      )}

      {/* Section Informations Académiques */}
      <TouchableOpacity
        className="bg-gray-200 p-3 rounded-lg mb-2"
        onPress={() => setAcademicInfoOpen(!academicInfoOpen)}
      >
        <Text className="text-lg font-semibold">Informations académiques</Text>
      </TouchableOpacity>

      {academicInfoOpen && (
        <View>
          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Matricule"
            keyboardType="numeric"
          />
          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Niveau"
          />
          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Établissement"
          />
          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Filière"
          />
        </View>
      )}

      {/* Bouton d'inscription */}
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg"
        onPress={() => navigation.navigate("Login")}
      >
        <Text className="text-center text-white font-semibold">S'inscrire</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterStudentScreen;
