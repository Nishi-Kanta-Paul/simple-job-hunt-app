
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary: string;
  description: string;
  requirements: string[];
  posted: string;
  logo: string;
  category: string;
  featured: boolean;
}

interface AppState {
  favorites: string[];
}

type AppAction =
  | { type: 'TOGGLE_FAVORITE'; payload: string };

const initialState: AppState = {
  favorites: JSON.parse(localStorage.getItem('job-favorites') || '[]'),
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const newFavorites = state.favorites.includes(action.payload)
        ? state.favorites.filter(id => id !== action.payload)
        : [...state.favorites, action.payload];
      localStorage.setItem('job-favorites', JSON.stringify(newFavorites));
      return { ...state, favorites: newFavorites };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export type { Job };
