export const DROPDOWN_STYLE_CONFIG = (darked, error = false) => {
    return {
        container: (base) => ({
            ...base,
            color: darked ? "#d1d5db" : "#000",
        }),
        singleValue: (base) => ({
            ...base,
            paddingLeft: 2,
            color: darked ? "#d1d5db" : "#000",
        }),
        valueContainer: (base, state) => ({
            ...base,
            color: 'transparent',
            paddingTop: 5.5,
            paddingBottom: 5.5,
        }),
        input: (base) => ({
            ...base,
            color: 'transparent',
        }),
        dropdownIndicator: (base, state) => ({
            ...base,
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
        }),
        control: (base, state) => ({
            ...base,
            fontSize: 16,
            borderRadius: 10,
            backgroundColor: state.selectProps.menuIsOpen ? (darked ? ' #1f2937' : "#fff") : (darked ? '#030712' : "#fff"),
            borderColor: state.selectProps.menuIsOpen ? '#7c3aed' : '#4b5563',
            "&:hover": {
                borderColor: state.selectProps.menuIsOpen ?  "#a88bfa" : (darked ? "#374151" : "#E5E7EB"),
            },
            boxShadow: "none",
            cursor: state.isDisabled ? "default" : "pointer",
        }),
        option: (base) => ({
            ...base,
            backgroundColor: darked ? '#030712' : "#fff",
            paddingLeft: 15,
            paddingRight: 15,
            color: darked ? "#d1d5db" : "#000",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: darked ? '#1F2937' : "#DDD6FE",
                transition: "background-color .3s ease-out",
            },
        }),
        menu: (base) => ({
            ...base,
            padding: '0px',
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: darked ? "0px 8px 15px 0px rgb(255, 255, 255, 0.10)" : "0px 8px 15px 0px rgba(0, 0, 0, 0.10)",
            backgroundColor: darked ? '#030712' : "#E9ECFE",
        }),
        menuList: (base) => ({
            ...base,
            padding: '0px',
            maxHeight: 200,
            fontSize: 14,
            border: "none",
            margin: '0',
            backgroundColor: darked ? '#030712' : "#E9ECFE",
        }),
        placeholder: (base) => ({
            ...base,
            paddingLeft: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            color: darked ? "#d1d5db" : "#000",
        }),
    };
};


export const DROPDOWN_STYLE_CONFIG_FORM = (darked, error = false) => {
    return {
        container: (base) => ({
            ...base,
            color: darked ? "#9ca3af" : "#000",
            paddingBottom: '1.25rem'
        }),
        singleValue: (base) => ({
            ...base,
            paddingLeft: 0,
            color: darked ? "#9ca3af" : "#000",
            textAlign: 'left'
        }),
        valueContainer: (base, state) => ({
            ...base,
            color: 'transparent',
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            textAlign: 'left'
        }),
        input: (base) => ({
            ...base,
            color: 'transparent',
        }),
        dropdownIndicator: (base, state) => ({
            ...base,
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
        }),
        control: (base, state) => ({
            ...base,
            fontSize: 12,
            borderRadius: 0,
            backgroundColor: darked ? '#030712' : "#fff",
            border: 'none',
            borderBottom: error ? '2px solid #ef4444' : '2px solid #4b5563',
            borderColor: state.selectProps.menuIsOpen ? '#7c3aed' : '#4b5563',
            "&:hover": {
                borderColor: state.selectProps.menuIsOpen ? '#7c3aed' : '#4b5563',
            },
            boxShadow: "none",
            cursor: state.isDisabled ? "default" : "pointer",
        }),
        option: (base) => ({
            ...base,
            backgroundColor: darked ? '#030712' : "#fff",
            paddingLeft: 15,
            paddingRight: 15,
            color: darked ? "#d1d5db" : "#000",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: darked ? '#1F2937' : "#DDD6FE",
                transition: "background-color .3s ease-out",
            },
        }),
        menu: (base) => ({
            ...base,
            padding: '0px',
            borderRadius: 0,
            overflow: "hidden",
            boxShadow: darked ? "0px 8px 15px 0px rgb(255, 255, 255, 0.10)" : "0px 8px 15px 0px rgba(0, 0, 0, 0.10)",
            backgroundColor: darked ? '#030712' : "#E9ECFE",
        }),
        menuList: (base) => ({
            ...base,
            padding: '0px',
            maxHeight: 200,
            fontSize: 12,
            border: "none",
            margin: '0',
            backgroundColor: darked ? '#030712' : "#E9ECFE",
        }),
        placeholder: (base) => ({
            ...base,
            paddingLeft: 0,
            marginLeft: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            color: darked ? "#9ca3af" : "#000",
            textAlign: 'left'
        }),
    };
}