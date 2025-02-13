import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { SendIcon, PaperclipIcon } from 'lucide-react-native';

// Données de test pour simuler une conversation
const initialMessages = [
  {
    id: '1',
    sender: 'Prof. Martin',
    content: 'Bonjour à tous, concernant le devoir de la semaine prochaine...',
    time: '10:30',
    isTeacher: true,
  },
  {
    id: '2',
    sender: 'Sophie L.',
    content: "Est-ce qu'on peut avoir plus de détails sur la partie 2 ?",
    time: '10:32',
    isTeacher: false,
  },
  {
    id: '3',
    sender: 'Prof. Martin',
    content: 'Bien sûr, la partie 2 portera sur les chapitres 4 et 5 du cours.',
    time: '10:35',
    isTeacher: true,
  },
];

const ChatApp = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null); // État pour le message sélectionné

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: Date.now().toString(),
      sender: 'Vous',
      content: newMessage,
      time: new Date().toLocaleTimeString().slice(0, 5),
      isTeacher: false,
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const MessageBubble = ({ item }) => (
    <View
      className={`flex-row mb-4 ${
        item.isTeacher ? 'justify-start' : 'justify-end'
      }`}
    >
      <View
        className={`w-full rounded-2xl p-3 ${
          item.isTeacher
            ? 'bg-gray-200 rounded-tl-none'
            : 'bg-blue-500 rounded-tr-none'
        }`}
      >
        <Text
          className={`text-xs font-bold mb-1 ${
            item.isTeacher ? 'text-blue-600' : 'text-white'
          }`}
        >
          {item.sender}
        </Text>
        <Text
          className={`${
            item.isTeacher ? 'text-gray-800' : 'text-white'
          }`}
        >
          {item.content}
        </Text>
        <Text
          className={`text-xs mt-1 ${
            item.isTeacher ? 'text-gray-500' : 'text-white/80'
          }`}
        >
          {item.time}
        </Text>
      </View>
    </View>
  );

  const renderMessage = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedMessage(item)}>
      <MessageBubble item={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {selectedMessage ? (
        // Vue détaillée du message sélectionné
        <View className="flex-1 p-4">
          <Text className="text-xl font-bold mb-4">{selectedMessage.sender}</Text>
          <Text className="text-lg">{selectedMessage.content}</Text>
          <Text className="text-gray-500 mt-2">{selectedMessage.time}</Text>

          <TouchableOpacity
            onPress={() => setSelectedMessage(null)} // Revenir à la liste des messages
            className="mt-4 p-2 bg-blue-500 rounded-full"
          >
            <Text className="text-white">Retour à la liste</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Vue principale avec la liste des messages
        <FlatList
          className="flex-1 p-4"
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          inverted={false}
        />
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="border-t border-gray-200"
      >
        <View className="flex-row items-center p-2 bg-white">
          <TouchableOpacity
            className="p-2 rounded-full"
            onPress={() => {}}
          >
            <PaperclipIcon size={24} color="#6B7280" />
          </TouchableOpacity>

          <TextInput
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 mx-2"
            placeholder="Écrivez votre message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />

          <TouchableOpacity
            className="bg-blue-500 p-2 rounded-full"
            onPress={sendMessage}
          >
            <SendIcon size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatApp;
