
import React, { useState, createContext } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = (props) => {
    const [theme, setTheme] = useState(
        {
            bg: 'dark',
            txt:'dark'
        });


    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    );
};