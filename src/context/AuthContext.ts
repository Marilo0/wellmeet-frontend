import {createContext} from "react";
import type {LoginFields} from "@/schemas/login.ts";

// Any component that uses `useAuth()` will have access to these values
type AuthContextProps = {
    isAuthenticated: boolean;
    accessToken: string | null;
    userId: string | null;
    username: string | null;
    userRole: string | null;
    loginUser: (fields: LoginFields) => Promise<void>;
    logoutUser: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)