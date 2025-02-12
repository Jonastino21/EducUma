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
import {registerWithPhoto} from "../services/signinController"

// Interface pour les informations d'inscription
interface RegisterStudentInfo {
  name: string;
  surname: string;
  email: string;
  password: string;
  telephone: string;
  school: string;
  department: string;
  level: string;
  matricule: string;
  pictureUri:String
}
export {RegisterStudentInfo}

const RegisterStudentScreen = ({ navigation }) => {
  // États pour gérer les sections
  const [personalInfoOpen, setPersonalInfoOpen] = useState(true);
  const [academicInfoOpen, setAcademicInfoOpen] = useState(false);

  // État pour les informations d'inscription
  const [registerState, setRegisterState] = useState<RegisterStudentInfo>({
    name: "",
    surname: "",
    email: "",
    password: "",
    telephone: "",
    school: "",
    department: "",
    level: "",
    matricule: "",
    pictureUri:""
  });

  // État pour l'image
  const [photoUri, setPhotoUri] = useState<string>("");
  const [photoName, setPhotoName] = useState<string | null>("");

  // Données pour les sélecteurs
  const institutions = ["ISSTM", "Autre Établissement"];
  const filieres = ["Génie Informatique", "Autre Filière"];
  const niveaux = ["L1", "L2", "L3", "M1", "M2"];

  // Fonctions pour basculer entre les sections
  const togglePersonalInfo = () => {
    setPersonalInfoOpen(true);
    setAcademicInfoOpen(false);
  };

  const toggleAcademicInfo = () => {
    setAcademicInfoOpen(true);
    setPersonalInfoOpen(false);
  };

  // Fonction pour sélectionner une photo
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
      const fileName = uri.split("/").pop() ?? "Image non définie";
      setPhotoUri(uri);
      setPhotoName(fileName);
      console.log("Photo sélectionnée : ", uri);
    }
  };

  // Fonction pour mettre à jour les champs du formulaire
  const handleInputChange = (field: keyof RegisterStudentInfo, value: string) => {
    setRegisterState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Fonction pour gérer l'inscription
  const handleRegister = async () => {
    const { name, surname, email, password, telephone, school, department, level, matricule } = registerState;

    // Validation des champs obligatoires
    if (!name || !surname || !email || !password || !telephone || !school || !department || !level || !matricule) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse email valide.');
      return;
    }

    try {
      console.log("vody ee")
      // Appel à l'API d'inscription
      const response = await registerWithPhoto(photoUri,registerState);
      console.log('Réponse de l\'API:', response);
      Alert.alert('Succès', 'Inscription réussie !');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Une erreur est survenue.');
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
            value={registerState.name}
            onChangeText={(value) => handleInputChange('name', value)}
          />
          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Prénoms"
            value={registerState.surname}
            onChangeText={(value) => handleInputChange('surname', value)}
          />
          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Téléphone"
            value={registerState.telephone}
            onChangeText={(value) => handleInputChange('telephone', value)}
          />
          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Email"
            keyboardType="email-address"
            value={registerState.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
          <TextInput
            className="bg-white p-3 rounded-lg border border-gray-300 mb-4"
            placeholder="Mot de passe"
            secureTextEntry
            value={registerState.password}
            onChangeText={(value) => handleInputChange('password', value)}
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
              selectedValue={registerState.school}
              onValueChange={(itemValue) => handleInputChange('school', itemValue)}
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
              selectedValue={registerState.department}
              onValueChange={(itemValue) => handleInputChange('department', itemValue)}
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
              selectedValue={registerState.level}
              onValueChange={(itemValue) => handleInputChange('level', itemValue)}
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
            value={registerState.matricule}
            onChangeText={(value) => handleInputChange('matricule', value)}
          />
        </View>
      )}

      {/* Bouton d'inscription */}
      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-lg"
        onPress={handleRegister}
      >
        <Text className="text-center text-white font-semibold">S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text className="text-center text-blue-500 p-5 font-semibold">Retour</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterStudentScreen;