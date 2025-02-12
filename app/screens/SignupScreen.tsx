import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import "./../../global.css";

const RegisterStudentScreen = ({ navigation }) => {
  // États pour gérer les informations des sections
  const [personalInfoOpen, setPersonalInfoOpen] = useState(true);
  const [academicInfoOpen, setAcademicInfoOpen] = useState(false);

  // États pour informations personnelles
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // États pour informations académiques
  const [matricule, setMatricule] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [institution, setInstitution] = useState("");
  const [filiere, setFiliere] = useState("");

  // Listes pour les menus déroulants
  const institutions = ["ISSTM", "IUTAM", "IUGM"];
  const filieres = [
    "Informatique",
    "Génie Logiciel",
    "Réseaux et Télécommunications",
    "Sécurité Informatique",
    "Intelligence Artificielle",
    "Systèmes Embarqués",
  ];
  const niveaux = ["L1", "L2", "L3", "M1", "M2"];

  // États pour l'image
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>("");

  const togglePersonalInfo = () => {
    setPersonalInfoOpen(true);
    setAcademicInfoOpen(false);
  };

  const toggleAcademicInfo = () => {
    setAcademicInfoOpen(true);
    setPersonalInfoOpen(false);
  };

  // Fonction pour demander des permissions et ouvrir la galerie
  const handlePhotoPick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission refusée",
        "Vous devez autoriser l'accès à la galerie pour sélectionner une photo."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const uri = result.assets[0].uri;
      const fileName = uri.split("/").pop() ?? "Image non définie"; // Valeur par défaut si undefined
      setPhotoUri(uri);
      setPhotoName(fileName); // Mettre à jour le nom ou l'indication
      console.log("Photo sélectionnée : ", uri);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 px-5">
      <Text className="text-center text-2xl font-bold my-6">Inscription</Text>

      {/* Section Informations Personnelles */}
      <TouchableOpacity
        className="bg-gray-200 p-3 rounded-lg mb-2 flex-row items-center justify-between"
        onPress={togglePersonalInfo}
      >
        <Text className="text-lg font-semibold">Informations personnelles</Text>
        <Icon
          name={personalInfoOpen ? "chevron-up" : "chevron-down"}
          size={15}
          color="#000"
        />
      </TouchableOpacity>

      {personalInfoOpen && (
        <View>
          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Nom"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Prénoms"
            value={surname}
            onChangeText={setSurname}
          />
          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Téléphone"
            value={phone}
            onChangeText={setPhone}
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

          {/* Bouton pour joindre une photo */}
          <TouchableOpacity
            className="bg-gray-400 p-4 rounded-lg flex-row justify-center items-center mb-4"
            onPress={handlePhotoPick}
          >
            <Text className="text-white font-semibold mr-2">
              {photoName ? photoName : "Joindre une photo"}
            </Text>
            <Icon name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      {/* Section Informations Académiques */}
      <TouchableOpacity
        className="bg-gray-200 p-3 mt-3 rounded-lg mb-2 flex-row items-center justify-between"
        onPress={toggleAcademicInfo}
      >
        <Text className="text-lg font-semibold">Informations académiques</Text>
        <Icon
          name={academicInfoOpen ? "chevron-up" : "chevron-down"}
          size={15}
          color="#000"
        />
      </TouchableOpacity>

      {academicInfoOpen && (
        <View>
          <View className="bg-white rounded-lg border border-gray-300 mb-4">
            <Picker
              selectedValue={institution}
              onValueChange={(itemValue) => setInstitution(itemValue)}
              className="p-3"
            >
              <Picker.Item label="Sélectionnez un établissement" value="" />
              {institutions.map((inst, index) => (
                <Picker.Item key={index} label={inst} value={inst} />
              ))}
            </Picker>
          </View>

          <View className="bg-white rounded-lg border border-gray-300 mb-4">
            <Picker
              selectedValue={filiere}
              onValueChange={(itemValue) => setFiliere(itemValue)}
              className="p-3"
            >
              <Picker.Item label="Sélectionnez une filière" value="" />
              {filieres.map((fil, index) => (
                <Picker.Item key={index} label={fil} value={fil} />
              ))}
            </Picker>
          </View>

          <View className="bg-white rounded-lg border border-gray-300 mb-4">
            <Picker
              selectedValue={selectedLevel}
              onValueChange={(itemValue) => setSelectedLevel(itemValue)}
              className="p-3"
            >
              <Picker.Item label="Sélectionnez un niveau" value="" />
              {niveaux.map((niv, index) => (
                <Picker.Item key={index} label={niv} value={niv} />
              ))}
            </Picker>
          </View>

          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Matricule étudiants"
            keyboardType="numeric"
            value={matricule}
            onChangeText={setMatricule}
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

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text className="text-center text-blue-500 p-5 font-semibold">
          Retour
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterStudentScreen;
