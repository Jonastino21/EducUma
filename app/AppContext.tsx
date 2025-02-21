import React, { createContext, useState, ReactNode } from "react";

// Définition de l'interface pour un événement
interface EventType {
  sender: string;
  title: string;
  content: string;
  attachmentLink: string;
  id: string;
}

// Définition de l'interface pour l'état global
interface AppState {
  events: EventType[];  
  user: {
    userId: number;
    userName: string;
    userPhoto: string;
    school: string;
    department: string;
    level: string;
    userGroup: {
      id: number;
      groupName: string;
    }[];
  } | null;
  token: string;
  theme: string;
}

// Définition de l'interface du contexte
interface AppContextType {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  addEvent: (event: EventType) => void; // Fonction pour ajouter un événement
}

// Création du contexte avec une valeur initiale par défaut
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Définition des props du Provider
interface AppProviderProps {
  children: ReactNode;
}

// Provider qui englobe toute l'application
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    events: [], // Initialisation correcte de events
    user: null,
    token: "",
    theme: "light",
  });

  // Fonction pour ajouter un événement
  const addEvent = (event: EventType) => {
    setState((prevState) => ({
      ...prevState,
      events: [event,...prevState.events],
    }));
  };

  return (
    <AppContext.Provider value={{ state, setState, addEvent }}>
      {children}
    </AppContext.Provider>
  );
};
