import React, { useEffect, useState } from 'react';
import { View, Text, Image, Animated } from 'react-native';

type EventCard = {
  title: string;
  description: string;
  image: string; // URL de l'image de l'événement
};

const EventDashboard = () => {
  const events: EventCard[] = [
    {
      title: 'Conférence Universitaire',
      description: 'Une conférence sur l\'avenir de l\'éducation à l\'Université.',
      image: 'https://scontent-mba2-1.xx.fbcdn.net/v/t39.30808-6/469780742_547416638176995_8336921463882462523_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHhvVLM3W8CGcAectWYQ3_bYLpdRTnNiDZgul1FOc2INrbHRGUxJiqfPM0MbtxIgNIY5_lImIIjhCc4dlU3VIqf&_nc_ohc=iW2s863rq28Q7kNvgFkzjdi&_nc_oc=AdiOJC8DTCgKYSPYwhyt36UjQEeFAMMvJjlxf75gxbPwDH-OsWTmAqnBetcfu4T3b_eTmwHMFt4008OIpQphJjFf&_nc_zt=23&_nc_ht=scontent-mba2-1.xx&_nc_gid=ALN7URHaaWL_uXW2ZAnlk-e&oh=00_AYC_3jrnGAKvKEk169VvcH6oQz6DHTKdWRbjlOD8_aMg2Q&oe=67B2645C',
    },
    {
      title: 'Atelier de Programmation',
      description: 'Apprenez à coder avec nos experts.',
      image: 'https://scontent.fnbo1-1.fna.fbcdn.net/v/t39.30808-6/469672549_548616358057023_8804128681151579811_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFBlxPZU2RS46gSwfEsXZ8iOTc_wrefAR05Nz_Ct58BHcrkeGP9ac9AvTIFAYWA0Z0A2w5Ckpm-RlVEH1RWN0nx&_nc_ohc=-MbbV37m3LYQ7kNvgEupz0o&_nc_oc=AdirZPXLLdHhnPwppMZYKFHonA8rzxAE2XpxqJq9zWwjeepPZU2XuRG78NADWPAuZ7twnlRbq4lFh8mYtK4sl4hy&_nc_zt=23&_nc_ht=scontent.fnbo1-1.fna&_nc_gid=ATSeVQ40-hyF1C1vtar9sMz&oh=00_AYATPpvlcnw5je7A8H8yzEKDU-v_mRwdW1-x5nDw-1sLGw&oe=67B27238',
    },
    {
      title: 'Exposition Artistique',
      description: 'Venez découvrir les œuvres de nos étudiants.',
      image: 'https://scontent-mba2-1.xx.fbcdn.net/v/t39.30808-6/473008600_568936212691704_3484913740274492056_n.jpg?stp=c160.0.960.960a_dst-jpg_s206x206_tt6&_nc_cat=106&ccb=1-7&_nc_sid=50ad20&_nc_eui2=AeEihDg6BVeevXrW9FDVvuoNaTq9XjsjR8JpOr1eOyNHwrfDPb6a0LQ2RBe0vdKj19g3q7bEZkqxBAAcN9BlVHxB&_nc_ohc=f0BS7afRx5gQ7kNvgFbGAnT&_nc_oc=Adg13-PmqW98ae90T-iuUoewYubuHsSCZ8tZT-2zIRvc9VDyON5dYa4FhcQVOmYQIcgv54EW6sGaK51oWRLN7UkZ&_nc_zt=23&_nc_ht=scontent-mba2-1.xx&_nc_gid=AanjpIvYLvnS1KFgcV1PyCl&oh=00_AYCGTaB39RWfPHJBzV5oMHnsIQGmBG_FF0mNYFfD7b4x6A&oe=67B2698D',
    },
    {
      title: 'Festival de Musique',
      description: 'Profitez de la musique en plein air avec des artistes locaux.',
      image: 'https://scontent-mba2-1.xx.fbcdn.net/v/t39.30808-6/475091640_580045651580760_4294970773027670818_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeErZC6SIeBfq7lLuJEuWssE2BHmSp_XF3_YEeZKn9cXf9ypi_8xcIOjsNtOlF0w5poIJVDNw2z0U04bPJFm4gvU&_nc_ohc=IHCPTM7sYOIQ7kNvgGCleKH&_nc_oc=AdiEa7Kwwj-uPAdTc9qlaqpcuEoydgXrdtRMo7jS5_PPyLPrFo4nOoUiDSfhCq9uXhe_v0qtwo_V7mF-zfpYDEmi&_nc_zt=23&_nc_ht=scontent-mba2-1.xx&_nc_gid=AN8hHXMv0rhfctRBuL5y__B&oh=00_AYAQcSP8wKZQrO1jVmrFZB2MDDEXqFjmWyFTj-QX26if_Q&oe=67B24457',
    },
  ];
    
  const [currentIndex, setCurrentIndex] = useState(0); // Index de l'événement actuel
  const translateX = useState(new Animated.Value(300))[0]; // Animation pour translation

  useEffect(() => {
    const interval = setInterval(() => {
      // Lancement de l'animation de translation
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: -300, // Glissement hors écran à gauche
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 300, // Réinitialisation hors écran à droite
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0, // Glissement à sa place
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();

      // Mise à jour de l'index pour passer à l'élément suivant
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 4000);

    return () => clearInterval(interval); // Nettoyer l'intervalle
  }, [translateX, events.length]);

  return (
    <View className="flex-1 items-center bg-gray-100">
  <Animated.View
    style={{
      transform: [{ translateX }],
      borderBottomLeftRadius: 16, // Radius en bas à gauche
      borderBottomRightRadius: 16, // Radius en bas à droite
      overflow: 'hidden', // Nécessaire pour respecter le radius sur l'image
    }}
    className="w-full bg-white shadow-lg"
  >
    <Image
      source={{ uri: events[currentIndex].image }}
      className="w-full h-40"
      style={{ resizeMode: 'cover' }}
    />

    <View className="p-2">
      <Text className="text-lg font-bold text-gray-900">
        {events[currentIndex].title}
      </Text>
      <Text className="text-sm text-gray-700">{events[currentIndex].description}</Text>
    </View>
  </Animated.View>
</View>

  );
};

export default EventDashboard;
