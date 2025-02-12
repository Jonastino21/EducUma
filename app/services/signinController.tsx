import axios, { AxiosError } from 'axios';
import { RegisterStudentInfo } from '../screens/SignupScreen';
import * as FileSystem from 'expo-file-system'; // Si vous utilisez Expo
import mime from 'mime';

const API_BASE_URL = 'http://192.168.43.173:8080';

// Fonction pour l'inscription
const register = async (registerState: RegisterStudentInfo) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register/student`, registerState, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Retourne les données de la réponse de l'API
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // Si l'API renvoie une réponse d'erreur
      throw new Error( 'Erreur lors de l\'inscription.');
    } else if (axiosError.request) {
      // Si la requête a été faite mais aucune réponse n'a été reçue
      throw new Error('Aucune réponse du serveur. Vérifiez votre connexion internet.');
    } else {
      // Si une erreur s'est produite lors de la configuration de la requête
      throw new Error('Erreur lors de la configuration de la requête.');
    }
  }
};

// Fonction pour uploader une photo
const uploadPhoto = async (photoUri: string) => {
    if (!photoUri) {
      throw new Error("Aucune image sélectionnée.");
    }
  
    try {
      // Obtenir le type MIME (image/jpeg, image/png, etc.)
      const mimeType = mime.getType(photoUri);
      
      // Lire l'image sous forme de blob
      const fileInfo = await FileSystem.getInfoAsync(photoUri);
      if (!fileInfo.exists) {
        throw new Error("Fichier introuvable.");
      }
  
      // Créer un objet `FormData`
      const formData = new FormData();
      formData.append("file", {
        uri: photoUri,
        name: "profile_picture.jpg",
        type: mimeType || "image/jpeg",
      });
  
      // Envoyer via Axios
      const response = await axios.post(`${API_BASE_URL}/file/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data; // Retourne la réponse de l’API
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error("Erreur lors de l'envoi de l'image.");
      } else if (axiosError.request) {
        throw new Error("Aucune réponse du serveur. Vérifiez votre connexion internet.");
      } else {
        throw new Error("Erreur lors de la configuration de la requête.");
      }
    }
  };