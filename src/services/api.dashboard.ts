
import { getAuthHeaders } from "@/utils/helpers.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function getDashboard() {
    const res = await fetch(`${API_URL}/users/me/dashboard`, {
        headers: getAuthHeaders(),
    });

    if (!res.ok) {
        throw new Error("Failed to fetch dashboard");
    }

    return res.json();
}
