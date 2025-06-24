
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
  jobs: Job[];
  filters: {
    search: string;
    type: string;
    category: string;
    remote: boolean;
  };
  favorites: string[];
  isLoading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_JOBS'; payload: Job[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_FILTER'; payload: { key: keyof AppState['filters']; value: any } }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'RESET_FILTERS' };

const initialState: AppState = {
  jobs: [],
  filters: {
    search: '',
    type: '',
    category: '',
    remote: false,
  },
  favorites: JSON.parse(localStorage.getItem('job-favorites') || '[]'),
  isLoading: false,
  error: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_JOBS':
      return { ...state, jobs: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.payload.key]: action.payload.value },
      };
    case 'TOGGLE_FAVORITE':
      const newFavorites = state.favorites.includes(action.payload)
        ? state.favorites.filter(id => id !== action.payload)
        : [...state.favorites, action.payload];
      localStorage.setItem('job-favorites', JSON.stringify(newFavorites));
      return { ...state, favorites: newFavorites };
    case 'RESET_FILTERS':
      return { ...state, filters: initialState.filters };
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
