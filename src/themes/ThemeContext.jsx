import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({children}) => {
    const localTheme = localStorage.getItem("theme") ?? "light";
    const [theme, setTheme] = useState(localTheme);
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};