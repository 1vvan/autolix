import React, { useState } from 'react';
import clsx from 'clsx';
import './switcher.scss'

export interface SwitcherProps {
  theme?: string;
  logic: () => void;
  className?: string;
}

export const Switcher: React.FC<SwitcherProps> = ({ logic, theme, className }) => {
  const [isClicked, setIsClicked] = useState(theme === "dark" ? true : false);
  const handleClick = () => {
    setIsClicked(!isClicked);
    logic();
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(`${className} switcher after:bg-white after:w-2/5`, {
        "bg-violet-500 dark:bg-violet-700": isClicked === false && !theme,
        "switcher--clicked bg-gray600": isClicked,
        "switcher--theme after:w-4/12 bg-violet-400": theme,
      })}
    ></button>
  );
};
