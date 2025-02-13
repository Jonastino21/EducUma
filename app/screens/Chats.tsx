import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MessageListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'L1-G.Info-Algorithme',
      content: 'Salut! Comment vas-tu?',
      timestamp: '10:30',
      unread: true,
      avatar: 'blob:https://www.facebook.com/2880b0bb-f611-4621-8868-e61c1fed3666',
      online: true,
      archived: false,
    },
    {
      id: '2',
      sender: 'L1-G.Info-Probabilité',
      content: 'On se voit demain pour le déjeuner?',
      timestamp: '09:15',
      unread: false,
      avatar: '/api/placeholder/40/40',
      online: false,
      archived: false,
    },
  ]);

  const updateMessage = (messageId, newContent, timestamp) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, content: newContent, timestamp } : msg
      )
    );
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch =
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'unread' && message.unread) ||
      (activeFilter === 'archived' && message.archived);
    return matchesSearch && matchesFilter;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className={`flex-row p-4 border-b border-gray-200 ${item.unread ? 'bg-blue-50' : 'bg-white'}`}
      onPress={() =>
        navigation.navigate('MessageDetail', {
          message: item,
          updateMessage,
        })
      }
    >
      <View className="relative">
        <Image source={{ uri: item.avatar }} className="w-12 h-12 rounded-full" />
        {item.online && <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
      </View>
      <View className="flex-1 ml-4">
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-base">{item.sender}</Text>
          <View className="flex-row items-center space-x-2">
            <Text className="text-gray-500 text-sm">{item.timestamp}</Text>
          </View>
        </View>
        <Text className="text-sm mt-1 text-gray-600" numberOfLines={1}>
          {item.content}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <View className="bg-blue-600 p-4">
        <Text className="text-white text-xl mt-3 font-bold mb-4">Messages</Text>
        <View className="flex-row bg-white rounded-lg p-2 items-center">
          <Ionicons name="search-outline" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 text-base ml-2"
            placeholder="Rechercher..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      <FlatList data={filteredMessages} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
};

const MessageDetailScreen = ({ route, navigation }) => {
  const { message, updateMessage } = route.params;
  const [newMessage, setNewMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: '1',
      sender: message.sender,
      content: message.content,
      timestamp: message.timestamp,
      isOutgoing: false,
    },
  ]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const timestamp = new Date().toLocaleTimeString();
      const newChat = {
        id: Date.now().toString(),
        sender: 'Vous',
        content: newMessage,
        timestamp,
        isOutgoing: true,
      };

      setChatHistory([...chatHistory, newChat]);
      updateMessage(message.id, newMessage, timestamp);
      setNewMessage('');
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-blue-600 p-4 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View className="flex-row flex-1 items-center">
          <Image source={{ uri: message.avatar }} className="w-10 h-10 rounded-full" />
          <View className="ml-3">
            <Text className="text-white font-bold text-lg">{message.sender}</Text>
            {message.online && <Text className="text-white text-sm opacity-80">En ligne</Text>}
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        className="flex-1 px-4"
        data={chatHistory}
        renderItem={({ item }) => (
          <View
            className={`max-w-[80%] p-4 rounded-lg my-2 ${
              item.isOutgoing ? 'bg-blue-600 self-end' : 'bg-gray-200 self-start'
            }`}
          >
            <Text className={`text-base ${item.isOutgoing ? 'text-white' : 'text-black'}`}>
              {item.content}
            </Text>
            <Text className={`text-xs ${item.isOutgoing ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
              {item.timestamp}
            </Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <View className="p-4 border-t border-gray-200 flex-row items-center">
        <TextInput
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
          placeholder="Écrivez votre message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity
          className={`p-3 rounded-full ${newMessage.trim() ? 'bg-blue-600' : 'bg-gray-400'}`}
          onPress={sendMessage}
          disabled={!newMessage.trim()}
        >
          <Text className="text-white font-bold">Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { MessageListScreen, MessageDetailScreen };