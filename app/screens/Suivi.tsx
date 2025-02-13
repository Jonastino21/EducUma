import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';

const StudentApp = () => {
  // États pour les données
  const [grades] = useState({
    semester: 'Semestre 1',
    subjects: [
      { name: 'Mathématiques', grade: 15, coefficient: 3 },
      { name: 'Physique', grade: 14, coefficient: 2 },
      { name: 'Informatique', grade: 16, coefficient: 4 }
    ]
  });

  const [assignments] = useState([
    { 
      id: 1, 
      title: 'Devoir de Mathématiques', 
      dueDate: '2024-02-20', 
      status: 'À rendre',
      description: 'Chapitre 5 - Exercices 1,2,3'
    },
    { 
      id: 2, 
      title: 'Projet Physique', 
      dueDate: '2024-02-25', 
      status: 'Soumis',
      description: 'Rapport sur les ondes électromagnétiques'
    }
  ]);

  const stats = {
    moyenne: 14.5,
    prochains_devoirs: 3,
    derniere_note: {
      matiere: 'Mathématiques',
      note: 16
    }
  };

  const calculateAverage = () => {
    let totalPoints = 0;
    let totalCoef = 0;
    grades.subjects.forEach(subject => {
      totalPoints += subject.grade * subject.coefficient;
      totalCoef += subject.coefficient;
    });
    return (totalPoints / totalCoef).toFixed(2);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Section Tableau de Bord */}
      <View className="p-4">
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-2xl font-bold mb-2">Suivi Académique</Text>
          <Text className="text-gray-600">Votre résumé académique</Text>
        </View>

        <View className="flex-row flex-wrap justify-between mb-4">
          <View className="bg-white p-4 rounded-lg shadow-sm w-[48%]">
          <Text className="text-gray-600">Résultats examen</Text>
          <Text className="text-green-500 mt-2 font-bold">Session validé</Text>
          </View>
          <View className="bg-white p-4 rounded-lg shadow-sm w-[48%]">
            <Text className="text-gray-600">Devoirs à rendre</Text>
            <Text className="text-2xl font-bold text-orange-500">{assignments.filter(a => a.status === 'À rendre').length}</Text>
          </View>
        </View>

        {/* Section Notes */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-xl font-bold mb-2">Notes du {grades.semester}</Text>
          {grades.subjects.map((subject, index) => (
            <View key={index} className="border-b border-gray-200 py-3">
              <Text className="font-semibold">{subject.name}</Text>
              <View className="flex-row justify-between">
                <Text>Note: {subject.grade}/20</Text>
                <Text>Coefficient: {subject.coefficient}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Section Devoirs */}
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-xl font-bold mb-4">Planning des devoirs</Text>
          <Calendar
            markedDates={{
              '2024-02-20': { marked: true, dotColor: 'red' },
              '2024-02-25': { marked: true, dotColor: 'green' }
            }}
            className="mb-4"
          />
        </View>

        <View className="bg-white p-4 rounded-lg shadow-sm">
          <Text className="text-xl font-bold mb-4">Devoirs à rendre</Text>
          {assignments.map(assignment => (
            <View key={assignment.id} className="border-b border-gray-200 py-3">
              <Text className="font-semibold">{assignment.title}</Text>
              <Text className="text-gray-600 mb-1">{assignment.description}</Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600">Pour le {assignment.dueDate}</Text>
                <Text className={`${
                  assignment.status === 'Soumis' ? 'text-green-500' : 'text-red-500'
                } font-medium`}>
                  {assignment.status}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default StudentApp;