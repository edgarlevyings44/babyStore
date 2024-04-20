import { createContext, ReactNode, useState } from 'react'


type JwtPayload = {
    _id: string;
    name: string;
    email: string;
    role: string;
}

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}
export interface AuthContextProps {
    token: string | null;
    isAuthenticated: boolean;
    user: User | null;
    userId: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [token, setToken] = useState<string | null>(localStorage.getItem('auth'));
    const [user, setUser] = useState<User | null>(() => JSON.parse(localStorage.getItem('user') || 'null'));
    const [userId, setUserId] = useState<string | null>(() => localStorage.getItem('userId'));

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem('auth', newToken);

        const decodedUser = jwtDecode<JwtPayload>(newToken) as User;
        setUser(decodedUser);
        localStorage.setItem("user", JSON.stringify(decodedUser));

        setUserId(decodedUser._id);
        localStorage.setItem('userId', decodedUser._id);

        // Log user info to console
        console.log("User logged in:", decodedUser);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setUserId(null);
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
    };

    const isAuthenticated = !!token;

    const contextValue: AuthContextProps = {
        token,
        isAuthenticated,
        user,
        userId,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}