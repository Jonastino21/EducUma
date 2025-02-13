import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
import TimeTable from '../components/emploi_du_temps'; // Assurez-vous que ce composant est correctement importé.

const CoursModule = () => {
  const [showTimeTable, setShowTimeTable] = useState(false);
  const [showResources, setShowResources] = useState(false);

  const toggleTimeTable = () => {
    setShowTimeTable(!showTimeTable);
    setShowResources(false); // Masquer les ressources pédagogiques quand on affiche l'emploi du temps
  };

  const toggleResources = () => {
    setShowResources(!showResources);
    setShowTimeTable(false); // Masquer l'emploi du temps quand on affiche les ressources pédagogiques
  };

  // Fonction pour télécharger l'emploi du temps
  const handleDownloadTimeTable = () => {
    const url = 'https://example.com/emploi_du_temps.pdf'; // Remplacez par l'URL réelle du fichier PDF
    Linking.openURL(url).catch((err) => console.error('Erreur de téléchargement:', err));
  };

  return (
    <View className="flex-1 bg-gray-50 p-4">
      {/* Boutons pour afficher les sections */}
      <View className="mb-4">
        <TouchableOpacity
          onPress={toggleTimeTable}
          className="bg-blue-500 p-3 rounded-lg mb-3"
        >
          <Text className="text-white text-center text-lg font-bold">Afficher l'emploi du temps</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleResources}
          className="bg-orange-400 p-3 rounded-lg"
        >
          <Text className="text-white text-lg text-center font-bold">Afficher les ressources pédagogiques</Text>
        </TouchableOpacity>
      </View>

      {/* Contenu */}
      <ScrollView>
        {showTimeTable && (
          <View className="mt-4">
            <TimeTable />
            <TouchableOpacity
              onPress={handleDownloadTimeTable}
              className="bg-green-500 p-3 rounded-lg mt-4"
            >
              <Text className="text-white text-center text-lg font-bold">Télécharger l'Emploi du Temps</Text>
            </TouchableOpacity>
          </View>
        )}

        {showResources && (
          <View className="mt-4">
            <Text className="text-lg font-bold">Ressources Pédagogiques</Text>
            {/* Placez ici votre composant RessourcesPedagogiques */}
            <Text className="mt-2">Contenu des ressources pédagogiques ici...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CoursModule;
