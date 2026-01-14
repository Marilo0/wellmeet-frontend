import { getCookie } from "@/utils/cookies";

/*
  Returns HTTP headers for API requests.
  If a JWT token exists, it adds the Authorization header.
*/
export const getAuthHeaders = () => {
    // Read JWT token from cookies (null if not logged in)
    const token = getCookie("access_token");

    return {
        // We send JSON data to the backend
        "Content-Type": "application/json",

        // Add Authorization header ONLY if token exists
        ...(token && { Authorization: `Bearer ${token}` }),
    };
};
