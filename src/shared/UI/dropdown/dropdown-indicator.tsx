import { components } from "react-select";
import React from "react";
import { useTheme } from "@/shared/theme-context/theme-context";
import { ICON_COLLECTION } from "@/shared/components/icon/icon-list";
import { Icon } from "@/shared/components/icon/icon";

export const DropdownIndicator = (props: any) => {
  const { theme } = useTheme();
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props} style={{ padding: 0 }}>
        <Icon icon={ICON_COLLECTION.chevronDown} iconColor={theme === 'dark' ? "#fff" : '#000'}/>
      </components.DropdownIndicator>
    )
  );
};
