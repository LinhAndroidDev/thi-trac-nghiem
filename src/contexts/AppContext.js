import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  theme: 'light',
  language: 'vi',
  quizHistory: [],
  currentQuiz: null,
  quizResults: null
};

// Action types
export const ACTIONS = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  SET_THEME: 'SET_THEME',
  SET_LANGUAGE: 'SET_LANGUAGE',
  ADD_QUIZ_HISTORY: 'ADD_QUIZ_HISTORY',
  SET_CURRENT_QUIZ: 'SET_CURRENT_QUIZ',
  SET_QUIZ_RESULTS: 'SET_QUIZ_RESULTS',
  CLEAR_QUIZ_RESULTS: 'CLEAR_QUIZ_RESULTS'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        quizHistory: []
      };
    case ACTIONS.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case ACTIONS.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    case ACTIONS.ADD_QUIZ_HISTORY:
      return {
        ...state,
        quizHistory: [action.payload, ...state.quizHistory]
      };
    case ACTIONS.SET_CURRENT_QUIZ:
      return {
        ...state,
        currentQuiz: action.payload
      };
    case ACTIONS.SET_QUIZ_RESULTS:
      return {
        ...state,
        quizResults: action.payload
      };
    case ACTIONS.CLEAR_QUIZ_RESULTS:
      return {
        ...state,
        quizResults: null
      };
    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('quizUser');
    const savedTheme = localStorage.getItem('quizTheme');
    const savedLanguage = localStorage.getItem('quizLanguage');
    const savedHistory = localStorage.getItem('quizHistory');

    if (savedUser) {
      dispatch({ type: ACTIONS.LOGIN, payload: JSON.parse(savedUser) });
    }
    if (savedTheme) {
      dispatch({ type: ACTIONS.SET_THEME, payload: savedTheme });
    }
    if (savedLanguage) {
      dispatch({ type: ACTIONS.SET_LANGUAGE, payload: savedLanguage });
    }
    if (savedHistory) {
      dispatch({ type: ACTIONS.ADD_QUIZ_HISTORY, payload: JSON.parse(savedHistory) });
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('quizUser', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('quizUser');
    }
  }, [state.user]);

  useEffect(() => {
    localStorage.setItem('quizTheme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem('quizLanguage', state.language);
  }, [state.language]);

  useEffect(() => {
    if (state.quizHistory.length > 0) {
      localStorage.setItem('quizHistory', JSON.stringify(state.quizHistory));
    }
  }, [state.quizHistory]);

  const value = {
    state,
    dispatch
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
