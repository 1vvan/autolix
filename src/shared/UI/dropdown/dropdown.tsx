import React from "react";
import Select from 'react-select';
import { DROPDOWN_STYLE_CONFIG, DROPDOWN_STYLE_CONFIG_FORM } from "./dropdown-styles";
import { useTheme } from "@/shared/theme-context/theme-context";
import { DropdownIndicator } from './dropdown-indicator';

interface DropdownProps {
    id: string;
    options: any;
    onChange: (key: string, value: string, isChecked?: boolean) => void;
    value?: string[] | number[] | string | number | null;
    isDisabled?: boolean;
    isLoading?: boolean;
    placeholder?: string;
    isMulti?: boolean;
    forForm?: boolean;
    error?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({ 
    id, 
    options, 
    isDisabled, 
    isLoading, 
    onChange, 
    placeholder, 
    value, 
    isMulti = false,
    forForm = false,
    error = false
}) => {
    const { theme } = useTheme();
    const styles = forForm ? 
        DROPDOWN_STYLE_CONFIG_FORM(theme === 'dark', error) : 
        DROPDOWN_STYLE_CONFIG(theme === 'dark', error);

    const handleChange = (selectedOption) => {
        if (isMulti) {
            onChange(id, selectedOption ? selectedOption.map(option => option.value) : []);
        } else {
            onChange(id, selectedOption ? selectedOption.value : null);
        }
    };

    const selectedValue = isMulti 
    ? (options || []).filter(option => (value as any[])?.includes(option.value)) 
    : (options || []).find(option => option.value === value);

    return (
        <>
            <Select
                onChange={handleChange}
                placeholder={placeholder}
                isDisabled={isDisabled}
                isLoading={isLoading}
                value={selectedValue ? selectedValue : null}
                id={id}
                isMulti={isMulti}
                name={`${id}-name`}
                styles={styles}
                options={options}
                components={{
                    IndicatorSeparator: null,
                    DropdownIndicator,
                  }}
            />
        </>
    )
}