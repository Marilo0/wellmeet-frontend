import {createContext} from "react";
import type {LoginFields} from "@/schemas/login.ts";

// This defines what data and functions will be available to consumers
type AuthContextProps = {
    isAuthenticated: boolean;
    accessToken: string | null;                  // JWT token (null if not logged in)
    userId: string | null;                       // User ID from token
    username: string | null;                     // Username from token
    userRole: string | null;                     // User role (Admin or User)
    loginUser: (fields: LoginFields) => Promise<void>;  // Async login function
    logoutUser: () => void;                      // Logout function
    loading: boolean;                            // Is auth state being initialized?
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined)