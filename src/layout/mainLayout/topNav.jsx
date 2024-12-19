import { Link } from "react-router-dom";
import { ChangeLanguage } from "../../components/change-language";
import { ChangeTheme } from "../../components/change-theme";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/app/app-context";

export const TopNav = () => {
  const { t } = useTranslation();
  const { toggleSidebar } = useAppContext();
  return (
    <>
      <nav className="navbar">
        <Link>
          <i
            className="hamburger align-self-center "
            onClick={toggleSidebar}
          ></i>
        </Link>
        <div className="d-flex align-items-center mr-3 gap-3 ">
          <ChangeLanguage />
          <ChangeTheme />
        </div>
        <div className={"me-auto"}>
          <button
            className="btn ms-2 btn-outline-danger fw-bolder"
            // onClick={logout}
          >
            {t("logout")}
          </button>
        </div>
      </nav>
    </>
  );
};
