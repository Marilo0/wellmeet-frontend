const API_URL = import.meta.env.VITE_API_URL;
import type {LoginFields} from "@/schemas/login.ts";
import type { UserRegisterFields, UserReadOnly } from "@/schemas/users.ts";

// JwtTokenDTO
export type LoginResponse = {
    token: string;
    username: string;
    role: string;
    expiresAt: string;
}

export async function login(
    {username, password, keepLoggedIn}: LoginFields): Promise<LoginResponse>
{
      const res = await fetch(API_URL + '/auth/login', {
        method: 'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              username,
              password,
              keepLoggedIn,
          }),
      });
    if (!res.ok) {
        let detail = "Login failed";  //default error
        try {
            const data = await res.json();

            if (typeof data?.detail === "string") detail = data.detail;
            if (typeof data?.title === "string") detail = data.title;
            if (typeof data === "string") detail = data;  //change the default with api error if exists

        } catch (error) {
            console.error("Error parsing error response:", error);
        }
        throw new Error(detail);
    }

    return await res.json();
}




// REGISTER

export async function register(userData: UserRegisterFields): Promise<UserReadOnly> {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    if (!res.ok) {
        let detail = "Registration failed";
        try {
            const data = await res.json();

            // Your backend seems to throw exceptions with "detail"/"title"
            if (typeof data?.detail === "string") detail = data.detail;
            else if (typeof data?.title === "string") detail = data.title;
            else if (typeof data === "string") detail = data;

            // If later you return { errors: { field: [...] } } this will support it too:
            else if (data?.errors) {
                const errors = Object.values(data.errors).flat();
                detail = (errors as string[]).join(", ");
            }
        } catch {
            // ignore parse errors
        }
        throw new Error(detail);
    }

    return await res.json();
}
