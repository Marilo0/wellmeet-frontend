import type {
    Activity,
    PaginatedResult,
    ActivityHasJoined,
    ActivityCreateFields,
    ActivityUpdateFields,
    ActivityFilters
} from "@/schemas/activities.ts"
import { getAuthHeaders } from "@/utils/authHeaders.ts";

// Base API URL (set in .env)
const API_URL = import.meta.env.VITE_API_URL


// ---------------------------------------------------------------------------
export async function  getActivities(
    pageNumber= 1,
    pageSize = 5,
    filters?: ActivityFilters
): Promise<PaginatedResult<Activity>> {

    // Build query parameters for pagination
    const params = new URLSearchParams({
        pageNumber : pageNumber.toString(),
        pageSize : pageSize.toString(),
    })

    // Add filter parameters only if they exist
    if (filters) {
        (Object.keys(filters) as (keyof ActivityFilters)[]).forEach((key) => {
            const value = filters[key];

            if (value === undefined || value === null) return;

            if (typeof value === "boolean") {
                if (value) params.append(key, "true");
                return;
            }

            //  TS knows it's string
            const v = value.trim();
            if (v !== "") params.append(key, v);
        });
    }

    const res = await fetch(`${API_URL}/activities?${params.toString()}`, {
        // method: 'GET',
        // headers: {"Content-Type": "application/json"},
    });
    if (!res.ok) throw new Error("Failed to fetch activities");

    return await res.json();
}

// ---------------------------------------------------------------------------
export async function getActivity(id: number): Promise<Activity> {
    const res = await fetch(`${API_URL}/activities/${id}`);
    if (!res.ok) throw new Error("Failed to fetch activity");
    return await res.json();
}

// ---------------------------------------------------------------------------
// Create - Requires authentication.
export async function createActivity(data: ActivityCreateFields): Promise<Activity> {
    const res = await fetch(`${API_URL}/activities`, {
        method: "POST",
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create activity");
    return await res.json();
}

// ---------------------------------------------------------------------------
//  Update - Requires authentication and ownership
export async function updateActivity(id: number, data: ActivityUpdateFields): Promise<Activity> {
    const res = await fetch(`${API_URL}/activities/${id}`, {
        method: "PUT",
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update activity");
    return await res.json();
}

// ---------------------------------------------------------------------------
// Delete - Requires authentication and ownership.
export async function deleteActivity(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/activities/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete activity");
}


// ---------------------------------------------------------------------------
//Fetch activity along with "hasJoined" flag.
export async function getActivityHasJoined(id: number): Promise<ActivityHasJoined> {
    const res = await fetch(`${API_URL}/activities/${id}/has-joined`, {
        headers: getAuthHeaders(),
    });

    if (!res.ok) {
        throw new Error("Failed to fetch activity (hasJoined)");
    }

    return await res.json();
}



