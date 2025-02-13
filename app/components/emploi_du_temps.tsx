import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { emploiDuTemps } from '../screens/CourScreen';

interface Course{
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

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function filterScheduleToShow(schedule: emploiDuTemps[], timeRange: string, day: string): Course[] {
  const [startRange, endRange] = timeRange.split('-').map(t => timeToMinutes(t));

  return schedule.filter(({ start, end, day: courseDay }) => {
      const startTime = timeToMinutes(start);
      const endTime = timeToMinutes(end);

      return courseDay.toLowerCase() === day.toLowerCase() && 
             startTime <= startRange && endTime >= endRange;
    })
    .map(({ subject, teacherName }) => ({
      subject,
      professor: teacherName,
    }));
}



const TimeTable = ({schedules}:{schedules:emploiDuTemps[]}) => {
  // Les créneaux horaires
  
  const heures = Array.from({ length: 11 }, (_, i) => {
    const startHour = 7 + i;
    const start = startHour.toString().padStart(2, "0") + ":00";
    const end = (startHour + 1).toString().padStart(2, "0") + ":00";
    return `${start}-${end}`;
  });
  
  console.log(heures);
  

  
  // Liste des jours de la semaine
  const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  
  // Générer dynamiquement les timeSlots
  const timeSlots: TimeSlot[] = heures.map((time, index) => ({
    id: (index + 1).toString(),
    time,
    courses: Object.fromEntries(
      jours.map((jour) => [jour, filterScheduleToShow(schedules, time, jour)[0]])
    ) as TimeSlot["courses"],
  }));


  const days = ['Horaires', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  // Composant pour une cellule du tableau
  const TableCell = ({ children, isHeader = false, isTimeColumn = false }) => (
    <View 
      className={`
        flex-1 p-2 border border-gray-300 
        ${isHeader ? 'bg-blue-500' : 'bg-white'}
        ${isTimeColumn ? 'bg-gray-100' : ''}
        justify-center items-center
        min-w-[120px] h-20
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
            {days.map((day) => (
              <TableCell key={day} isHeader={true}>
                {day}
              </TableCell>
            ))}
          </View>
  
          {/* Corps du tableau avec hauteur uniforme */}
          {timeSlots.map((slot) => (
            <View key={slot.id} className="flex-row h-20"> 
              {/* Colonne des horaires */}
              <TableCell isTimeColumn={true}>
                {slot.time}
              </TableCell>
  
              {/* Cellules pour chaque jour */}
              {Object.values(slot.courses).map((course, index) => (
                <TableCell key={`${slot.id}-${index}`}>
                  {course ? (
                    <View style={{flex:1,flexDirection:"row"}}>
                      <Text className="font-medium">{course.subject}</Text>
                      <Text className="text-sm text-gray-600">{course.professor}</Text>
                    </View>
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