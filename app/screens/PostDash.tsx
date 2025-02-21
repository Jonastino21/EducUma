import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import {
  PaperAirplaneIcon,
} from "react-native-heroicons/outline";
import EventDashboard from "./AccueilDash";

const LinkedInPost = ({ posts }) => {
  return (
    <View>
    
    <FlatList  
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className="bg-white rounded-lg py-2 p-2 shadow-sm">
          {/* Header */}
          <View className="flex-row items-center p-3">
            <Image
              source={require("../../assets/images/profilUmg.jpg")}
              className="w-10 h-10 rounded-full"
            />
            <View className="ml-2 flex-1">
              <Text className="font-bold text-gray-900">{item.sender}</Text>
              <Text className="text-gray-500 text-sm">{item.title}</Text>
            </View>
            <Text className="text-gray-500">...</Text>
          </View>

          {/* Content */}
          <View className="p-2">
            <Text className="text-gray-900">{item.content}</Text>
          </View>

          {/* Image */}
          {item.attachmentLink && (
            <Image
              source={{ uri: item.attachmentLink }} 
              className="w-full h-80 rounded-lg mb-3"
            />
          )}

          {/* Engagement stats */}
          <View className="flex-row items-center mb-3">
            <Image
              source={{ uri: "https://example.com/like-icon.png" }} // Met une vraie URL
              className="w-4 h-4"
            />
          </View>

          {/* Action buttons */}
          <View className="items-center pt-2 border-t border-gray-200">
            <TouchableOpacity className="flex-row items-center">
              <PaperAirplaneIcon size={24} color="#6B7280" />
              <Text className="ml-2 text-gray-500">Partager</Text>
            </TouchableOpacity>
          </View>

          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginVertical: 10 }} />
        </View>
      )}
    />
    </View>
  );
};


const LinkedInPost2 = () => {
  return (
    <View className="bg-white rounded-lg py-2 p-2 shadow-sm">
      {/* Header */}
      <View className="flex-row items-center p-3">
        <Image
          source={require("./../../assets/images/profilUmg.jpg")}
          className="w-10 h-10 rounded-full"
        />
        <View className="ml-2 flex-1">
          <View className="flex-row items-center">
            <Text className="font-bold text-gray-900">Université de Mahajanga Officiel</Text>
          </View>
          <Text className="text-gray-500 text-sm">
            UMG | Enseignement supérieur
          </Text>
        </View>
        <Text className="text-gray-500">...</Text>
      </View>

      {/* Content */}
      <View className="p-2">
        <Text className="font-semi-bold text-gray-900">SOMMET DigITafrica</Text>
        <Text className="text-gray-900">Le projet DigITafrica Erasmus+ financé par l'Union Européenne (2022-2025) est coordonné par l'Université de Tunis</Text>
        <Text className="text-gray-900">El Manar UTM (Tunisie), ayant comme membres du consortium 9 universités europennes et africaines. Le projet a pour objectif de faciliter et renforcer la transformation numérique dans les institutions. Les objectifs spécifiques consistent à améliorer les compétences numériques essentielles; construire une communauté pratique qui se concentre sur l'engagement des coûts... </Text>
  </View>

      {/* Image */}
      <Image
        source={require("./../../assets/images/postUma.png")}
        className="w-full h-80 rounded-lg mb-3"
      />

      {/* Engagement stats */}
      <View className="flex-row items-center mb-3">
        <View className="flex-row items-center">
          <Image
            source={{ uri: "/api/placeholder/16/16" }}
            className="w-4 h-4"
          />
        </View>
      </View>

      {/* Action buttons */}
      <View className="items-center pt-2 border-t border-gray-200">
        <TouchableOpacity className="flex-row items-center">
          <PaperAirplaneIcon size={24} color="#6B7280" />
          <Text className="ml-2 text-gray-500">Partager</Text>
        </TouchableOpacity>
      </View>
      
    </View>

    
  );
};

export { LinkedInPost,LinkedInPost2 };
