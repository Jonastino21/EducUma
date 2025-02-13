import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { envoiMessage, getMessages } from '../services/signinController';
import { AppContext } from '../AppContext';

interface responseMessage{
  content:string,
  type:string,
  from:number,
  fromType:string,
  to:number,
  recipientType:string,
}
export {responseMessage}

const MessageListScreen = ({ navigation }) => {

  const {state , setState} = useContext(AppContext)


  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [groupList,setGroupsList] = useState(state.user.userGroup)
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


  const archiveMessage = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === messageId ? { ...msg, archived: true } : msg
      )
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className={`flex-row p-4 border-b border-gray-200 ${item.unread ? 'bg-blue-50' : 'bg-white'}`}
      onPress={() =>
        navigation.navigate('MessageDetail', {
          group: item,
          updateMessage,
        })
      }
    >
      <View className="relative">
        </View>
      <View className="flex-1 ml-4">
        <View className="flex-row justify-between items-center">
          <Text className="font-bold text-base">{item.groupName}</Text>
          <View className="flex-row items-center space-x-2">
            <Text className="text-gray-500 text-sm">{item?.timestamp}</Text>
            <TouchableOpacity onPress={() => archiveMessage(item.id)}>
              <Ionicons name="archive-outline" size={23} color="#6B7280" />
            </TouchableOpacity>
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
        <Text className="text-white text-xl font-bold mb-4">Messages</Text>
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
      <FlatList data={groupList} renderItem={renderItem} keyExtractor={item => item.id} />
    </View>
  );
};

const MessageDetailScreen = ({ route, navigation }) => {
  const { group, updateMessage } = route.params;
  const [newMessage, setNewMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const {state , setState} = useContext(AppContext)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log({ chatId: group.id, chatType: "GROUP", before: 0 });
        const data = await getMessages({ chatId: group.id, chatType: "GROUP", before: 0 });
        console.error(data);
        setChatHistory(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des messages:", error);
      }
    };
  
    fetchMessages();
  }, [group.id]); // Ne se déclenche que lorsque le groupe change
  const handleSubmit = ()=>{
    setNewMessage('');
    const sendMessage = async () => {
    if (newMessage.trim()) {
      const timestamp = new Date().toLocaleTimeString();
      
    
      const messageToSend:responseMessage = {
        content: newMessage.trim(),
        type: 'TEXT',
        from: state.user.userId,
        fromType: 'STUDENT',
        to: group.id,
        recipientType: 'GROUP',
      }
      const messageResponse = await envoiMessage(messageToSend);
      setChatHistory([messageResponse,...chatHistory]);
      updateMessage(messageResponse.id, messageResponse, timestamp);
    }
  }
  sendMessage()
};

  const handleMessageTyped = (value)=>{
      setNewMessage(value)
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}vvb 
      <View className="bg-blue-600 p-4 flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View className="flex-row flex-1 items-center">
          <View className="ml-3">
            <Text className="text-white font-bold text-lg">{group.groupName}</Text>
            {true && <Text className="text-white text-sm opacity-80">En ligne</Text>}
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        className="flex-1 px-4"
        data={[...chatHistory].reverse()}
        renderItem={({ item }) => (
          <View
            className={`max-w-[80%] p-4 rounded-lg my-2 ${
              item.fromId == state.user.userId ? 'bg-blue-600 self-end' : 'bg-gray-200 self-start'
            }`}
          >
            <Text className={`text-base ${item.fromId == state.user.userId ? 'text-white' : 'text-black'}`}>
              {item.content}
            </Text>
            <Text className={`text-xs ${item.fromId == state.user.userId ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
              {item.creation}
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
          onChangeText={handleMessageTyped}
        />
        <TouchableOpacity
          className={`p-3 rounded-full ${newMessage.trim() ? 'bg-blue-600' : 'bg-gray-400'}`}
          onPress={handleSubmit}
          disabled={!newMessage.trim()}
        >
          <Text className="text-white font-bold">Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { MessageListScreen, MessageDetailScreen };