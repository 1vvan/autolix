import React from "react";
import Select from 'react-select';
import { DROPDOWN_STYLE_CONFIG } from "./dropdown-styles";
import { useTheme } from "@/shared/theme-context/theme-context";
import { DropdownIndicator } from './dropdown-indicator';

interface DropdownProps {
    id: string;
    options: any;
    onChange: (key: string, value: string) => void;
    value?: number | string | null;
    isDisabled?: boolean;
    isLoading?: boolean;
    placeholder?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({ id, options, isDisabled, isLoading, onChange, placeholder, value }) => {
    const { theme } = useTheme();
    const styles = DROPDOWN_STYLE_CONFIG(theme === 'dark');

    const handleChange = (selectedOption) => {
        onChange(id, selectedOption.value);
    };

    const selectedValue = options.find(option => option.value === value);

    return (
        <>
            <Select
                onChange={handleChange}
                placeholder={placeholder}
                isDisabled={isDisabled}
                isLoading={isLoading}
                value={selectedValue ? selectedValue : null}
                id={id}
                name={`${id}-name`}
                options={options}
                styles={styles}
                components={{
                    IndicatorSeparator: null,
                    DropdownIndicator,
                  }}
            />
        </>
    )
}