import { useContext } from "react";
import { UserContext, UserContextProps } from "../context/userContext";
export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUser must be used within an UserProvider')
    }

    return context
};