import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import TimeTable from '../components/emploi_du_temps'; // Assurez-vous que ce composant est correctement importé.
import { enmploi } from '../services/signinController';

interface emploiDuTemps {
  subject: string;
  start: string;
  end: string;
  day: string;
  teacherName: string;
} // Assurez-vous que ce composant est correctement 
import ResourcesSection from './CoursRessource';


const CoursModule = () => {
  const [showTimeTable, setShowTimeTable] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [emploi, setEmploi] = useState<emploiDuTemps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmploiDuTemps = async () => {
      try {
        const data = await enmploi({school:"isstm",department:"genie informatique",level:"M1"}); // Appelle l'API (assure-toi que `enmploi` est bien une fonction asynchrone)
        setEmploi(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'emploi du temps:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmploiDuTemps();
  }, []);

  const toggleTimeTable = () => {
    setShowTimeTable(!showTimeTable);
    setShowResources(false);
  };

  const toggleResources = () => {
    setShowResources(!showResources);
    setShowTimeTable(false);
  };

  const handleDownloadTimeTable = () => {
    const url = 'https://example.com/emploi_du_temps.pdf';
    Linking.openURL(url).catch((err) => console.error('Erreur de téléchargement:', err));
  };

  return (

    <View className="flex-1 w-full bg-gray-50 p-4">
      {/* Boutons pour afficher les sections */}
      <View className="mb-4 ">
        <TouchableOpacity
          onPress={toggleTimeTable}
          className="bg-blue-500 p-3 rounded-lg mb-3"
        >
          <Text className="text-white text-center text-lg font-bold">Afficher l'emploi du temps</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleResources} className="bg-orange-400 p-3 rounded-lg">
          <Text className="text-white text-lg text-center font-bold">Afficher les ressources pédagogiques</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {showTimeTable && (
          <View className="mt-4">
            {loading ? (
              <Text className="text-center text-gray-500">Chargement...</Text>
            ) : (
              <TimeTable schedules={emploi} />
            )}
            <TouchableOpacity onPress={handleDownloadTimeTable} className="bg-green-500 p-3 rounded-lg mt-4">
              <Text className="text-white text-center text-lg font-bold">Télécharger l'Emploi du Temps</Text>
            </TouchableOpacity>
          </View>
        )}

        {showResources && (
          <View className="mt-4">
            <Text className="mt-2">Contenu des ressources pédagogiques ici...</Text>

            {/* Placez ici votre composant RessourcesPedagogiques */}
            <ResourcesSection/>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export { emploiDuTemps };
export default CoursModule;
