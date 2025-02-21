import React, { useState,useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import AnalyticsDashboard from "./AccueilDash";
import CoursModule from "./CourScreen";
import { AppContext } from "../AppContext";
import {LinkedInPost,LinkedInPost2} from "./PostDash";


import {Client} from '@stomp/stompjs';
import SockJs from 'sockjs-client';

import StudentApp from "./Suivi";
import { configureNotification, createMessageNotif } from "../services/NotificationService";
import EventDashboard from "./AccueilDash";

const CoursScreen = () => (

  <View className="flex-1 justify-center items-center bg-gray-100">
    <CoursModule />

  </View>
);

const CommunicationScreen = () => (
  <View className="flex-1 justify-center items-center bg-gray-100">
    <Text className="text-lg font-bold">Communication</Text>
  </View>
);


const Home = () => {
  const { state } = useContext(AppContext);
  const [events, setEvents] = useState(state.events); 

  useEffect(() => {
    setEvents(state.events);
  }, [state.events]);  // Re-render dès qu'un nouvel événement est ajouté

  return (
    <ScrollView>
      <EventDashboard/>
      <LinkedInPost posts={events} />
      <LinkedInPost2/>
    </ScrollView>
  );
};

const SuiviScreen = () => (
  <View className="flex-1 justify-center items-center bg-gray-100">
    <StudentApp/>
  </View>
);

const Tab = createBottomTabNavigator();


export default function App() {
  
  const { state, setState,addEvent } = useContext(AppContext);
  const [unreadMessages, setUnreadMessages] = useState(0)
    const stompConfig = {
      connectHeaders: {},
      brokerURL: "ws://192.168.43.173:8080/ws",
      forceBinaryWSFrames: true,
      appendMissingNULLonIncoming: true,
      debug: function (str) {
          console.log('STOMP: ' + str);
      },
      reconnectDelay: 200,
      onConnect: function (frame) {
          console.log("connected")

          state.user.userGroup.forEach((group) => {
            stompClient.subscribe(`/topic/group/${group.id}`, async function (message) {
              console.log(`📩 Message reçu pour le groupe ${group.id}:`, JSON.parse(message.body));
              
              const messageBody = JSON.parse(message.body);
              setUnreadMessages((prev) => prev + 1);
              // 🔔 Afficher une notification
              await createMessageNotif(
                `Nouveau message dans le groupe ${group.id}`,
                messageBody.data.content,
                { groupId: group.id }
              );
            });
          });

          stompClient.subscribe(`/topic/evenement`, async function (message) {
            const messageBody = JSON.parse(message.body);
            console.log("📩 Message reçu:", messageBody);
        
            // 🔔 Afficher une notification
            await createMessageNotif(
              `Evenement au sein de UM`,
              messageBody.data.content,
              { debut:messageBody.data.start }
            );

            const newEvent = {
                sender: messageBody.data.sender,
                title: messageBody.data.title,
                content: messageBody.data.content,
                attachmentLink: messageBody.data.attachmentLink,
                id: messageBody.data.id || Math.random().toString(), // Assurez-vous que chaque event a un ID unique
            };
        
            // 🔍 Vérifier si l'événement existe déjà dans state.events
            if (!state.events.some(event => event.id === newEvent.id)) {
                addEvent(newEvent);
        
                // 🔔 Envoyer une seule notification push
                await createMessageNotif(
                    "Nouvel Événement",
                    `${newEvent.title} - ${newEvent.content}`,
                    { eventId: newEvent.id }
                );
            }
        });
        
        },
      onStompError: (frame) => {
          console.log('Additional details: ' + frame.body);
      },
  }
  const stompClient = new Client(stompConfig);
  useEffect(() => {
    configureNotification();
    stompClient.activate();
  }, [])
  
  
  console.log(state);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route, navigation }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Cours") {
              iconName = "book-outline";
            } else if (route.name === "Communication") {
              iconName = "chatbubbles-outline";
            } else if (route.name === "Suivi") {
              iconName = "analytics-outline";
            } else if (route.name === "Accueil") {
              iconName = "home-outline";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#1E90FF",
          tabBarInactiveTintColor: "gray",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#1E7FCB",
          },
          headerTitle: "",
          headerRight: () => (
            <View className="flex-row items-center gap-3 pr-4">
              <TouchableOpacity onPress={() => {
                  navigation.navigate("MessageList");
                  setUnreadMessages(0); // Réinitialiser le compteur quand on ouvre les messages
                }} className="relative">
                  <Icon name="chatbubbles-outline" size={25} color="white" />
                  {unreadMessages > 0 && (
                    <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
                      <Text className="text-white text-xs font-bold">{unreadMessages}</Text>
                    </View>
                  )}
                </TouchableOpacity>

              <TouchableOpacity onPress={() => console.log("Notifications!")}>
                <Icon name="notifications-outline" size={25} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
                <Icon name="person-circle-outline" size={40} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <View>
              
              <Text className="text-xl p-4 font-bold text-white">
                <Text style={{ color: "orange" }}>E</Text>
                duc
                <Text style={{ color: "orange" }}>U</Text>
                ma
              </Text>
            </View>
          ),
        })}
      >
        <Tab.Screen name="Accueil" component={Home} />
        <Tab.Screen name="Cours" component={CoursScreen} />
        <Tab.Screen name="Suivi" component={SuiviScreen} />
      </Tab.Navigator>

      {/* Profile menu modal */}
      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <Pressable
          className="flex-1  bg-opacity-50"
          onPress={() => setIsMenuVisible(false)}
        >
          <View className="absolute top-14 right-4 bg-white rounded-lg shadow-lg p-4 w-48">
            <TouchableOpacity
              className="py-2"
              onPress={() => {
                console.log("Mon profil");
                setIsMenuVisible(false);
              }}
            >
              <Text className="text-black text-sm font-medium">Mon profil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-2"
              onPress={() => {
                console.log("Paramètres");
                setIsMenuVisible(false);
              }}
            >
              <Text className="text-black text-sm font-medium">Paramètres</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="py-2"onPress={() => navigation.navigate("Login")}
            >
              <Text className="text-red-500 text-sm font-medium">
                Se déconnecter
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};