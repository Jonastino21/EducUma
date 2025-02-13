import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ArrowPathRoundedSquareIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/outline";

const LinkedInPost = () => {
  return (
    <View className="bg-white rounded-lg py-2 p-2 shadow-sm">
      {/* Header */}
      <View className="flex-row items-center p-3">
        <Image
          source={require("./../../assets/images/logo.png")}
          className="w-10 h-10 rounded-full"
        />
        <View className="ml-2 flex-1">
          <View className="flex-row items-center">
            <Text className="font-bold text-gray-900">Myriame Angelinah</Text>
            <Text className="text-gray-500 mx-1">•</Text>
            <Text className="text-gray-500">Abonné</Text>
          </View>
          <Text className="text-gray-500 text-sm">
            CEO | 50 % de moins sur vos coûts de dév, dispo immédiate et suivi
            per...
          </Text>
        </View>
        <Text className="text-gray-500">...</Text>
      </View>

      {/* Content */}
      <View className="p-2">
        <Text className="text-gray-900">Explorez les opportunités de bourses à l'étranger pour enrichir vos compétences académiques et découvrir de nouvelles cultures.
        </Text>
        <Text className="text-gray-900">Les bourses internationales vous ouvrent la voie à des établissements prestigieux, tout en allégeant vos frais d'études.</Text>
        <Text className="text-gray-900">
        Ne manquez pas cette chance de réaliser vos ambitions et de bâtir un avenir prometteur grâce à des soutiens financiers adaptés. 💜
        </Text>
      </View>

      {/* Image */}
      <Image
        source={require("./../../assets/images/educuma.png")}
        className="w-full h-20 rounded-lg mb-3"
      />

      {/* Engagement stats */}
      <View className="flex-row items-center mb-3">
        <View className="flex-row items-center">
          <Image
            source={{ uri: "/api/placeholder/16/16" }}
            className="w-4 h-4"
          />
          <Text className="text-gray-500 ml-1">132</Text>
        </View>
        <Text className="text-gray-500 mx-2">•</Text>
        <Text className="text-gray-500">2 commentaires</Text>
      </View>

      {/* Action buttons */}
      <View className="flex-row justify-between pt-2 border-t border-gray-200">
        <TouchableOpacity className="flex-row items-center">
          <HeartIcon size={24} color="#6B7280" />
          <Text className="ml-2 text-gray-500">J'aime</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center">
          <ChatBubbleLeftIcon size={24} color="#6B7280" />
          <Text className="ml-2 text-gray-500">Commenter</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center">
          <ArrowPathRoundedSquareIcon size={24} color="#6B7280" />
          <Text className="ml-2 text-gray-500">Republier</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center">
          <PaperAirplaneIcon size={24} color="#6B7280" />
          <Text className="ml-2 text-gray-500">Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LinkedInPost;
