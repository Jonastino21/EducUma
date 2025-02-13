import React from 'react';
import { View, Text, ScrollView } from 'react-native';

type Course = {
  subject: string;
  professor: string;
};

type TimeSlot = {
  id: string;
  time: string;
  courses: {
    [key: string]: Course | null; // key est le jour (lundi, mardi, etc.)
  };
};

const TimeTable = () => {
  // Les créneaux horaires
  const timeSlots: TimeSlot[] = [
    {
      id: '1',
      time: '08:00-10:00',
      courses: {
        lundi: null,
        mardi: null,
        mercredi: null,
        jeudi: null,
        vendredi: null,
        samedi: null,
      },
    },
    {
      id: '2',
      time: '10:00-12:00',
      courses: {
        lundi: null,
        mardi: null,
        mercredi: null,
        jeudi: null,
        vendredi: null,
        samedi: null,
      },
    },
    {
      id: '3',
      time: '14:00-16:00',
      courses: {
        lundi: null,
        mardi: null,
        mercredi: null,
        jeudi: null,
        vendredi: null,
        samedi: null,
      },
    },
    {
      id: '4',
      time: '16:00-18:00',
      courses: {
        lundi: null,
        mardi: null,
        mercredi: null,
        jeudi: null,
        vendredi: null,
        samedi: null,
      },
    },
  ];

  const days = ['Horaires', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  // Composant pour une cellule du tableau
  const TableCell = ({ children, isHeader = false, isTimeColumn = false }) => (
    <View 
      className={`
        p-2 border border-gray-300 
        ${isHeader ? 'bg-blue-500' : 'bg-white'}
        ${isTimeColumn ? 'bg-gray-100' : ''}
        justify-center items-center
        min-w-[100px] h-20
      `}
    >
      <Text 
        className={`
          text-center
          ${isHeader ? 'text-white font-bold' : 'text-gray-800'}
          ${isTimeColumn ? 'font-medium' : ''}
        `}
      >
        {children}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <Text className="text-xl font-bold text-center py-4 bg-white">
        Emploi du Temps
      </Text>
      
      <ScrollView horizontal>
        <View>
          {/* En-tête du tableau avec les jours */}
          <View className="flex-row">
            {days.map((day, index) => (
              <TableCell key={day} isHeader={true}>
                {day}
              </TableCell>
            ))}
          </View>

          {/* Corps du tableau */}
          {timeSlots.map((slot) => (
            <View key={slot.id} className="flex-row">
              {/* Colonne des horaires */}
              <TableCell isTimeColumn={true}>
                {slot.time}
              </TableCell>

              {/* Cellules pour chaque jour */}
              {Object.values(slot.courses).map((course, index) => (
                <TableCell key={`${slot.id}-${index}`}>
                  {course ? (
                    <>
                      <Text className="font-medium">{course.subject}</Text>
                      <Text className="text-sm text-gray-600">{course.professor}</Text>
                    </>
                  ) : (
                    '---'
                  )}
                </TableCell>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TimeTable;