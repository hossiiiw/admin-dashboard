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

  //change theme useEffect
  useEffect(() => {
    localStorage.setItem("theme", state.theme);
    const localTheme = localStorage.getItem("theme");
    if (localTheme === "light") {
      document.body.classList.add("bg-dark");
      document.body.classList.remove("bg-light");
    } else {
      document.body.classList.add("bg-light");
      document.body.classList.remove("bg-dark");
    }
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
