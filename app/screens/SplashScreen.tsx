import React from "react";
import { View, Text, Image } from "react-native";

const SplashScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
        <Image
        source={require('./../../assets/images/univ.png')}  // Remplacez par le chemin de votre image
        style={{ width: 70, height: 70, alignSelf: 'center', marginBottom: 0, borderRadius: 50  }} // Ajustez la taille du logo selon vos besoins
      />
      <Text className="text-lg font-bold">EducUma</Text>
    </View>
  );
};

export default SplashScreen;
