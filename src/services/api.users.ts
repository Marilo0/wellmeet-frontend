import type { PaginatedResult } from "@/schemas/activities";
import type { UserReadOnly } from "@/schemas/users";
import { getAuthHeaders } from "@/utils/authHeaders.ts";

const API_URL = import.meta.env.VITE_API_URL;

export async function getUsers(
    pageNumber = 1,
    pageSize = 50
): Promise<PaginatedResult<UserReadOnly>> {
    const params = new URLSearchParams({
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString(),
    });

    const res = await fetch(`${API_URL}/users?${params.toString()}`, {
        headers: getAuthHeaders(),
    });

    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }

    return res.json();
}