import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';

type Course = {
  subject: string;
  professor: string;
};

type TimeSlot = {
  id: string;
  time: string;
  courses: {
    [key: string]: Course | null;
  };
};

const TimeTable = () => {
  const CELL_WIDTH = 120; // Largeur fixe pour chaque cellule
  const CELL_HEIGHT = 80; // Hauteur fixe pour chaque cellule

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

  // Composant optimisé pour une cellule du tableau
  const TableCell = ({ children, isHeader = false, isTimeColumn = false }) => (
    <View 
      style={{
        width: CELL_WIDTH,
        height: CELL_HEIGHT,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        backgroundColor: isHeader ? '#3B82F6' : isTimeColumn ? '#F3F4F6' : '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
      }}
    >
      {typeof children === 'string' ? (
        <Text 
          numberOfLines={3}
          ellipsizeMode="tail"
          style={{
            textAlign: 'center',
            color: isHeader ? '#FFFFFF' : '#1F2937',
            fontWeight: isHeader || isTimeColumn ? 'bold' : 'normal',
            fontSize: isHeader ? 14 : 12,
          }}
        >
          {children}
        </Text>
      ) : (
        <View style={{ width: '100%' }}>
          {React.Children.map(children, (child, index) => (
            <Text
              key={index}
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                textAlign: 'center',
                fontSize: 12,
                color: index === 0 ? '#1F2937' : '#4B5563',
                marginBottom: 2,
              }}
            >
              {child.props.children}
            </Text>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <Text className="text-xl font-bold text-center py-4 bg-white">
        Emploi du Temps
      </Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View>
          {/* En-tête du tableau avec les jours */}
          <View style={{ flexDirection: 'row' }}>
            {days.map((day) => (
              <TableCell key={day} isHeader={true}>
                {day}
              </TableCell>
            ))}
          </View>

          {/* Corps du tableau */}
          {timeSlots.map((slot) => (
            <View key={slot.id} style={{ flexDirection: 'row' }}>
              <TableCell isTimeColumn={true}>
                {slot.time}
              </TableCell>

              {Object.values(slot.courses).map((course, index) => (
                <TableCell key={`${slot.id}-${index}`}>
                  {course ? (
                    <>
                      <Text>{course.subject}</Text>
                      <Text>{course.professor}</Text>
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