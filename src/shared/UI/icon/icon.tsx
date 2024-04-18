import * as React from "react";
import "./icon.scss";

import { IconCollectionType } from "./icon-list";
interface IconProps {
  className?: string;
  icon: IconCollectionType;
  iconColor?: string;
  iconSize?: string;
  hoverColor?: string;
  hasStroke?: boolean
}

export const Icon: React.FC<IconProps> = ({
  className,
  icon,
  iconColor,
  iconSize,
  hoverColor,
  hasStroke = true,
}) => {
  const Component = icon;

  const [isHovered, setIsHovered] = React.useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const hoverStyles =
    isHovered && hoverColor
      ? {
          color: hoverColor,
          transition: "all 0.2s ease 0s",
        }
      : {};

  return (
    <span
      className={`icon ${className}`}
      style={{
        color: iconColor,
        width: iconSize,
        height: iconSize,
        ...hoverStyles,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Component stroke={hasStroke ? "currentColor" : 'none'} fill={hasStroke ? "none" : "currentColor"} />
    </span>
  );
};
