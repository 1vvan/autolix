import React, { useEffect, useState } from "react";
import { clsx } from 'clsx';
import { Switcher } from "../../UI/switcher/switcher";
import styles from './header.module.scss'
import { useTheme } from "../theme-context/theme-context";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { HeaderMenu } from '@/shared/constants/header-menu';
import { ROUTES } from "@/shared/constants/routes";
import headerIconLight from '@icons/logo-light.svg'
import headerIconDark from '@icons/logo-dark.svg'

export const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
  
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
      className={clsx("fixed z-50 header h-20 flex flex-row items-center justify-center", {
        [styles["header--open"]]: isMenuOpen,
      })}
    >
      <div className=" header__container h-full flex items-center justify-between w-screen mx-auto px-8 dark:border-b dark:bg-dark-bg dark:border-dark-border">
      {theme === "light" ? (
          <a href={ROUTES.available_cars.path} className="w-56 xl:w-fit">
            <img src={headerIconLight} alt=""/>
          </a>
        ) : (
          <a href={ROUTES.available_cars.path} className="w-56 xl:w-fit">
            <img src={headerIconDark} alt=""/>
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
          )}
        >
          <ul
            className={clsx(
              styles["header-menu__list"],
              "flex gap-x-1 xl:gap-x-6 text-xl h-full"
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {HeaderMenu.map((item) => (
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
              <Switcher logic={() => handleThemeSwitch()} theme={theme} className="w-69 h-9"/>
          </div>

        </nav>
      </div>
    </header>
  );
};
