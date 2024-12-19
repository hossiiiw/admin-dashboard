import { useAppContext } from "../context/app/app-context";
import { IoSunnySharp } from "react-icons/io5";
import { IoIosMoon } from "react-icons/io";

import "./style.css";

export const ChangeTheme = () => {
  const { theme, changeTheme } = useAppContext();

  const chnageThemeHandler = (theme) => {
    changeTheme(theme === "light" ? "dark" : "light");
    console.log(theme);
  };
  return (
    <>
      <div>
        <button
          onClick={() => {
            chnageThemeHandler(theme);
          }}
        >
          {/* theme */}
          {theme === "light" ? (
            <IoSunnySharp className="icon icon__sun" />
          ) : (
            <IoIosMoon className="icon icon__moon" />
          )}
        </button>
      </div>
    </>
  );
};
