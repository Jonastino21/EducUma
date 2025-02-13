import React, { createContext, useState, ReactNode } from "react";

// Définition de l'interface pour l'état global
interface AppState {
  user: {
    userId: number;
    userName: string;
    userPhoto: string;
    school:string,
    department:string,
    level: string
    userGroup:[{
        id:number,
        groupName:string,
    }]
  } | null;
  token: string;
  theme: string;
}

// Définition de l'interface du contexte
interface AppContextType {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

// Création du contexte avec une valeur initiale par défaut
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Définition des props du Provider
interface AppProviderProps {
  children: ReactNode;
}

export {AppState};
// Provider qui englobe toute l'application
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    user: null,
    token: "",
    theme: "light",
  });

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};
