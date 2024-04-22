import React, { useEffect, useState } from "react";
import { clsx } from 'clsx';
import { Switcher } from "../../shared/UI/switcher/switcher";
import styles from './header.module.scss'
import { useTheme } from "../../shared/theme-context/theme-context";
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ROUTES } from "@/shared/constants/routes";
import headerIconLight from '@icons/logo-light.svg'
import headerIconDark from '@icons/logo-dark.svg'
import { Icon } from "@/shared/UI/icon/icon";
import { ICON_COLLECTION } from "@/shared/UI/icon/icon-list";
import { isAuthenticated, logout, useIsAdmin } from "@/shared/helpers/authHelpers";
import { logoutUser } from "@/app/store/reducers/UserSlice";
import { useDispatch } from "react-redux";
import { adminMenu, userMenu } from "@/shared/constants/fields";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const isAdmin = useIsAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const userHeader = (isAdmin ? adminMenu : (isAuthenticated() ? userMenu : userMenu.filter(item => item.path === ROUTES.cars.path)))
  const handleNavigateToLogin = () => navigate(ROUTES.login.path);

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    toggleTheme();
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);


  return (
    <header
      className={clsx("fixed z-50 header h-20 flex flex-row items-center justify-center bg-white dark:bg-dark-bg", {
        [styles["header--open"]]: isMenuOpen,
      })}
    >
      <div className=" header__container h-full flex items-center justify-between w-screen mx-auto px-8 dark:border-b dark:bg-dark-bg dark:border-dark-border">
        {theme === "light" ? (
          <a href={ROUTES.cars.path} className="w-56 xl:w-fit">
            <img src={headerIconLight} alt="" />
          </a>
        ) : (
          <a href={ROUTES.cars.path} className="w-56 xl:w-fit">
            <img src={headerIconDark} alt="" />
          </a>
        )}

        <div
          className={clsx(styles["burger-button"])}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="bg-black dark:bg-white"></span>
          <span className="bg-black dark:bg-white"></span>
          <span className="bg-black dark:bg-white"></span>
        </div>
        <div
          className={styles["header-blur"]}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        ></div>
        <nav
          className={clsx(
            styles["header-menu"],
            "flex items-center justify-between h-full w-full md:bg-white dark:bg-dark-bg overflow-y-auto md:overflow-y-visible"
          , {
            'max-w-6xl': isAdmin,
            'max-w-5xl': !isAuthenticated(),
            'max-w-5.5xl': isAuthenticated() && !isAdmin
          })}
        >
          <ul
            className={clsx(
              styles["header-menu__list"],
              "flex gap-x-1 xl:gap-x-6 text-xl h-full"
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {userHeader.map((item) => (
              <li
                key={item.label}
                className={clsx(
                  styles["header-menu__item"],
                  "h-full px-2 py-3 md:py-0 flex justify-center items-center cursor-pointer border-b-2 border-transparent md:hover:bg-violet_light md:hover:dark:bg-violet_light md:hover:text-violet_light transition-all duration-300 hover:dark:bg-gray-800",
                  {
                    "font-sf-pro font-bold md:border-violet_light text-black md:text-violet_light  dark:text-white md:hover:text-white":
                      location.pathname === item.path,
                    "font-sf-pro px-3 text-black md:text-gray400 md:hover:text-white dark:text-gray-500":
                      location.pathname !== item.path,
                  }
                )}

              >
                <Link to={item.path} className="h-full flex items-center justify-center">{item.label}</Link>
              </li>
            ))}
          </ul>
          <div
            className={clsx(
              styles["side-buttons"],
              "flex items-center justify-center gap-1 xl:gap-3"
            )}
          >
            <Switcher logic={() => handleThemeSwitch()} theme={theme} className="w-69 h-9" />
            {isAuthenticated() ? (
              <button className="flex items-center justify-center" onClick={() => { logout(); dispatch(logoutUser()); }}>
                <Icon
                  icon={ICON_COLLECTION.logout}
                  iconSize="32px"
                  iconColor="#ff0000"
                  hoverColor="#800000"
                />
              </button>
            ) : (
              <button
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                onClick={() => handleNavigateToLogin()}
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Login
                </span>
              </button>
            )}
          </div>

        </nav>
      </div>
    </header>
  );
};
