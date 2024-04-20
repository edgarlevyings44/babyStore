import { createContext, ReactNode, useState } from 'react'

//Define the theme type 
type Theme = 'light' | 'dark';

//Define the context type
export interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}

// Create the context
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Create the context provider
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const contextValue: ThemeContextProps = {
        theme,
        toggleTheme,
    };

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
};