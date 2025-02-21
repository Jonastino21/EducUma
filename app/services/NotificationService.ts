import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Permissions from "expo-permissions";


// 🔹 Configurer les notifications
const configureNotification = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== "granted") {
    console.log("Permission de notification refusée !");
    return;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
};

// 🔔 Fonction pour créer une notification push locale
const createMessageNotif = async (title, content, data) => {

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        })})
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: content,
      data: data,
    },
    trigger: { seconds: 1 }, // 🔥 Affichage immédiat avec un petit délai
  });
};

export { configureNotification, createMessageNotif };
