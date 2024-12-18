import { createContext, useContext, useEffect, useReducer } from "react";
import { appReducer } from "./appReducer";
import { useTranslation } from "react-i18next";

const Appcontext = createContext();

const initialState = {
  language: localStorage.getItem("language") || "fa",
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    dispatch({
      type: "CHANGE_LANGUAGE",
      payload: language,
    });
  };

  useEffect(() => {
    i18n.changeLanguage(state.language);
    localStorage.setItem("language", state.language);
    document.body.dataset.direction = state.language === "fa" ? "rtl" : "ltr";
  }, [state.language]);
  return (
    <Appcontext.Provider value={{ ...state, changeLanguage }}>
      {children}
    </Appcontext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(Appcontext);
};
