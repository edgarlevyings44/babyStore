import { createContext, ReactNode, useState } from 'react'

interface User {
    id: number;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    firstname: string;
    lastname: string;
    role: Role[];
    user_type:number;
}
interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}
export interface UserContextProps {
    token: string | null;
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string,newUser:User) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [token, setToken] = useState<string | null>(localStorage.getItem('Token'));
    const [user, setUser] = useState<User | null>(() => JSON.parse(localStorage.getItem('User') || 'null'));
    
    const login = (newToken: string, newUser:User) => {
        setToken(newToken);
        localStorage.setItem('Token', newToken);

        setUser(newUser);
        localStorage.setItem('User', JSON.stringify(newUser));

        console.log("User logged in:", newUser);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('Token');
        localStorage.removeItem('User');
    };

    const isAuthenticated = !!token;

    const contextValue: UserContextProps = {
        token,
        isAuthenticated,
        user,
        login,
        logout,
    };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}