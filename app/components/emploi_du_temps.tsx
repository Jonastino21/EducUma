import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';

interface Course {
  subject: string;
  professor: string;
}

type emploiDuTemps = {
  subject: string;
  teacherName: string;
  start: string;
  end: string;
  day: string;
};

type TimeSlot = {
  id: string;
  time: string;
  courses: {
    [key: string]: Course | null;
  };
};

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function filterScheduleToShow(schedule: emploiDuTemps[], timeRange: string, day: string): Course | null {
  const [startRange, endRange] = timeRange.split('-').map(t => timeToMinutes(t));

  const matchedCourse = schedule.find(({ start, end, day: courseDay }) => {
    const startTime = timeToMinutes(start);
    const endTime = timeToMinutes(end);

    return (
      courseDay.toLowerCase() === day.toLowerCase() &&
      startTime <= startRange && 
      endTime >= endRange
    );
  });

  return matchedCourse ? { subject: matchedCourse.subject, professor: matchedCourse.teacherName } : null;
}

const TimeTable = ({ schedules }: { schedules: emploiDuTemps[] }) => {
  // Création des plages horaires
  const heures = Array.from({ length: 11 }, (_, i) => {
    const startHour = 7 + i;
    const start = `${startHour.toString().padStart(2, "0")}:00`;
    const end = `${(startHour + 1).toString().padStart(2, "0")}:00`;
    return `${start}-${end}`;
  });

  const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  // Création des créneaux horaires avec les cours correspondants
  const timeSlots: TimeSlot[] = heures.map((time, index) => ({
    id: (index + 1).toString(),
    time,
    courses: Object.fromEntries(
      jours.map(jour => [jour, filterScheduleToShow(schedules, time, jour)])
    ) as TimeSlot["courses"],
  }));

  const CELL_WIDTH = 120; 
  const CELL_HEIGHT = 80; 

  const days = ['Horaires', ...jours];

  // Composant cellule optimisé
  const TableCell = ({ children, isHeader = false, isTimeColumn = false }: { children: React.ReactNode, isHeader?: boolean, isTimeColumn?: boolean }) => (
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
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingVertical: 10, backgroundColor: 'white' }}>
        Emploi du Temps
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={{ flexGrow: 1 }}>
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

              {jours.map((jour, index) => (
                <TableCell key={`${slot.id}-${index}`}>
                  {slot.courses[jour] ? (
                    <View>
                      <Text>{slot.courses[jour]?.subject}{"\n\n"} {slot.courses[jour]?.professor}</Text>
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
