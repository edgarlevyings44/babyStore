import { useContext } from "react";
import { UserContext, UserContextProps } from "../context/userContext";
export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }

    return context
};