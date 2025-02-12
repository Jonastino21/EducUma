import React, { useEffect, useState } from 'react';
import { View, Text, Image, Animated } from 'react-native';

type EventCard = {
  title: string;
  description: string;
  image: string; // URL de l'image de l'événement
};

const EventDashboard = () => {
  // Données des événements
  const events: EventCard[] = [
    {
      title: 'Conférence Universitaire',
      description: 'Une conférence sur l\'avenir de l\'éducation à l\'Université.',
      image: 'https://scontent-mba2-1.xx.fbcdn.net/v/t39.30808-6/469780742_547416638176995_8336921463882462523_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHhvVLM3W8CGcAectWYQ3_bYLpdRTnNiDZgul1FOc2INrbHRGUxJiqfPM0MbtxIgNIY5_lImIIjhCc4dlU3VIqf&_nc_ohc=iW2s863rq28Q7kNvgFkzjdi&_nc_oc=AdiOJC8DTCgKYSPYwhyt36UjQEeFAMMvJjlxf75gxbPwDH-OsWTmAqnBetcfu4T3b_eTmwHMFt4008OIpQphJjFf&_nc_zt=23&_nc_ht=scontent-mba2-1.xx&_nc_gid=ALN7URHaaWL_uXW2ZAnlk-e&oh=00_AYC_3jrnGAKvKEk169VvcH6oQz6DHTKdWRbjlOD8_aMg2Q&oe=67B2645C',
    },
    {
      title: 'Atelier de Programmation',
      description: 'Apprenez à coder avec nos experts.',
      image: 'https://example.com/event2.jpg',
    },
    {
      title: 'Exposition Artistique',
      description: 'Venez découvrir les œuvres de nos étudiants.',
      image: 'https://example.com/event3.jpg',
    },
    {
      title: 'Festival de Musique',
      description: 'Venez profiter de la musique en plein air avec des artistes locaux.',
      image: 'https://example.com/event4.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Index de l'événement actuel
  const fadeAnim = useState(new Animated.Value(1))[0]; // Animation d'opacité

  useEffect(() => {
    const interval = setInterval(() => {
      // Démarrage de l'effet de fondu
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0, // Fade-out
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1, // Fade-in
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();

      // Mise à jour de l'index pour passer à l'élément suivant
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 3000);

    return () => clearInterval(interval); // Nettoyer l'intervalle
  }, [fadeAnim, events.length]);

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}
        className="w-11/12 bg-white rounded-2xl overflow-hidden shadow-lg"
      >
        <Image
          source={{ uri: events[currentIndex].image }}
          className="w-full h-48"
          style={{ resizeMode: 'cover' }}
        />
        <View className="p-4">
          <Text className="text-lg font-bold text-gray-900 mb-2">
            {events[currentIndex].title}
          </Text>
          <Text className="text-sm text-gray-700">{events[currentIndex].description}</Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default EventDashboard;
