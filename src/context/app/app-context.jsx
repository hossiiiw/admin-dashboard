import { createContext, useContext, useEffect, useReducer } from "react";
import { appReducer } from "./appReducer";
import { useTranslation } from "react-i18next";

const Appcontext = createContext();

const initialState = {
  language: localStorage.getItem("language") || "fa",
  theme: localStorage.getItem("theme") || "ligth",
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { i18n } = useTranslation();
  //change language hanlder
  const changeLanguage = (language) => {
    dispatch({
      type: "CHANGE_LANGUAGE",
      payload: language,
    });
  };

  // chnage theme handler
  const changeTheme = (theme) => {
    dispatch({
      type: "CHANGE_THEME",
      payload: theme,
    });
  };

  //change language useEffect
  useEffect(() => {
    i18n.changeLanguage(state.language);
    localStorage.setItem("language", state.language);
    document.body.dataset.direction = state.language === "fa" ? "rtl" : "ltr";
  }, [state.language]);

  //change theme in localStorage
  useEffect(() => {
    localStorage.setItem("theme", state.theme);
  }, [state.theme]);
  return (
    <Appcontext.Provider value={{ ...state, changeLanguage, changeTheme }}>
      {children}
    </Appcontext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(Appcontext);
};
