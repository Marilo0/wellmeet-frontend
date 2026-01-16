import { useEffect, useState } from "react";
import type { LoginFields } from "@/schemas/login.ts";
import { login } from "@/services/api.auth.ts";
import { deleteCookie, getCookie, setCookie } from "@/utils/cookies.ts";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "@/context/AuthContext.ts";
/* eslint-disable react-hooks/set-state-in-effect */


/**
 JWT payload structure - STANDARD .NET Identity claim names
*/
type JwtPayload = {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"?: string;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
    // "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"?: string;  //not used from f-end yet
    exp?: number;
};

/**
  Checks if a JWT is expired.
*/
function isTokenExpired(token: string) {
    try {
        const decoded = jwtDecode<JwtPayload>(token);

        // If the token has no expiration, invalid
        if (!decoded.exp) return true;

        const now = Math.floor(Date.now() / 1000);

        return decoded.exp <= now;
    } catch {
        return true;
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [accessToken, setAccessToken] = useState<string | null>(
        () => getCookie("access_token") ?? null
    );

    // User info from JWT
    const [userId, setUserId] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    // prevent UI flicker while auth is being checked
    const [loading, setLoading] = useState(true);

    // Clears user-related state
    const resetUser = () => {
        setUserId(null);
        setUsername(null);
        setUserRole(null);
    };

    // Fully logs the user out (cookie + state)
    const forceLogout = () => {
        deleteCookie("access_token");
        setAccessToken(null);
        resetUser();
    };

    /**
      Runs whenever the access token changes.
      - on app startup
      - after login
      - after logout
    */
    useEffect(() => {

        if (!accessToken) {
            resetUser();
            setLoading(false);
            return;
        }

        if (isTokenExpired(accessToken)) {
            forceLogout();
            setLoading(false);
            return;
        }

        try {
            const decoded = jwtDecode<JwtPayload>(accessToken);

            setUserId(
                decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ?? null
            );
            setUsername(
                decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ?? null
            );
            setUserRole(
                decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ?? null
            );
        } catch {
            forceLogout();
        } finally {
            setLoading(false);
        }
    }, [accessToken]);


    // Log in
    const loginUser = async (fields: LoginFields) => {
        const res = await login(fields);

        setCookie("access_token", res.token, {
            expires: 1,
            sameSite: "Lax",
            secure: import.meta.env.PROD, //true in PROD , false in DEV
            path: "/",
        });

        setAccessToken(res.token);
    };

    // Logout
    const logoutUser = () => {
        forceLogout();
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!accessToken,
                accessToken,
                userId,
                username,
                userRole,
                loginUser,
                logoutUser,
                loading,
            }}
        >
            {loading ? <div className="p-8 text-center">Loading...</div> : children}
        </AuthContext.Provider>
    );
};
