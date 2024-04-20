import React from "react";
import { useTheme } from "../hooks/useTheme";

const ThemedComponent: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
        <p>Current Theme: {theme}</p>
        <button onClick={toggleTheme}>Toggle Theme</button>
        </>
    )
}

export default ThemedComponent;