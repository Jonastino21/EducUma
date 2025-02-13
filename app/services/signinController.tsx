import axios, { AxiosError } from 'axios';
import { RegisterStudentInfo } from '../screens/SignupScreen';
import { responseMessage } from '../screens/Chats';

const API_BASE_URL = 'http://192.168.1.188:8080';

// Fonction pour l'inscription
const register = async (registerState: RegisterStudentInfo) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register/student`, registerState, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; 
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw new Error( 'Erreur lors de l\'inscription.');
    } else if (axiosError.request) {
      throw new Error('Aucune réponse du serveur. Vérifiez votre connexion internet.');
    } else {
      throw new Error('Erreur lors de la configuration de la requête.');
    }
  }
};

// Fonction pour uploader une photo
const uploadPhoto = async (photoUri: string) => {
  console.log("yow")
  if (!photoUri) {
    throw new Error("Aucune image sélectionnée.");
  }
  try {
  console.log(photoUri)
  const formData = new FormData();
  const file = {
    uri: photoUri,
    name: 'profile_picture.jpg', // Nom du fichier
    type: 'image/jpeg', // Type MIME du fichier
  };

  // Ajoute le fichier à FormData
  formData.append('file', file as any);

  console.log("form data")
    const response = await axios.post(`${API_BASE_URL}/file/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response)
    return response.data; // Retour de l’API
  } catch (error) {
    console.log(error)
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw new Error('Erreur lors de l\'envoi de l\'image.');
    } else if (axiosError.request) {
      throw new Error('Aucune réponse du serveur. Vérifiez votre connexion internet.');
    } else {
      throw new Error('Erreur lors de la configuration de la requête.');
    }
  }
};

// Fonction pour l'inscription avec photo
const registerWithPhoto = async (photoUri: string, studentInfo: RegisterStudentInfo) => {
  try {
    console.log("photo")
    const photoInfo = await uploadPhoto(photoUri);
    console.log(photoInfo)
    studentInfo.pictureUri = photoInfo.viewUrl; // Ajoute l'URL de la photo aux informations de l'étudiant
    return await register(studentInfo);
  } catch (error) {
    throw new Error('Erreur lors de l\'inscription avec photo.');
  }
};
interface donne{
  school:string,
  department:string,
  level:string
}

const enmploi = async (school:donne) =>
  {
    try {
      const response = await axios.post(`${API_BASE_URL}/schedule/student`,school , {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; 
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error( 'Erreur lors de l\'inscription.');
      } else if (axiosError.request) {
        throw new Error('Aucune réponse du serveur. Vérifiez votre connexion internet.');
      } else {
        throw new Error('Erreur lors de la configuration de la requête.');
      }
    }
  };

  const envoiMessage= async(messageInfo:responseMessage)=>{
    try {
      const response = await axios.post(`${API_BASE_URL}/message/send`,messageInfo,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; 
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        throw new Error( 'Erreur lors de l\'inscription.');
      } else if (axiosError.request) {
        throw new Error('Aucune réponse du serveur. Vérifiez votre connexion internet.');
      } else {
        throw new Error('Erreur lors de la configuration de la requête.');
      }
    }
  };

  interface ChatInfo{
    chatId:number,
    chatType:string,
    before:0
  }
  const getMessages =async (groupInfo:ChatInfo)=>{try {
    const response = await axios.post(`${API_BASE_URL}/message/get`,groupInfo,{
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data; 
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw new Error( 'Erreur lors de l\'inscription.');
    } else if (axiosError.request) {
      throw new Error('Aucune réponse du serveur. Vérifiez votre connexion internet.');
    } else {
      throw new Error('Erreur lors de la configuration de la requête.');
    }
  }
}


export {enmploi,donne,envoiMessage,getMessages}
export { registerWithPhoto };