import type {
    Activity,
    PaginatedResult,
    ActivityCreateFields,
    ActivityUpdateFields,
    ActivityFilters
} from "@/schemas/activities.ts"
import { getAuthHeaders } from "@/utils/helpers";

const API_URL = import.meta.env.VITE_API_URL
// const userId = import.meta.env.VITE_USER_ID

// --------------------------------------------------------------------------GET ACTIVITIES
export async function  getActivities(
    pageNumber= 1,
    pageSize = 5,
    filters?: ActivityFilters
): Promise<PaginatedResult<Activity>> {

    const params = new URLSearchParams({
        pageNumber : pageNumber.toString(),
        pageSize : pageSize.toString(),
    })
    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
                params.append(key, String(value));
            }
        });
    }
    const res = await fetch(`${API_URL}/activities?${params.toString()}`, {
        // method: 'GET',
        // headers: {"Content-Type": "application/json"},
    });
    if (!res.ok) throw new Error("Failed to fetch activities");

    return await res.json();
}

//--------------------------------------------------------------------------------------------------------

export async function getActivity(id: number): Promise<Activity> {         //GET ACTIVITY
    const res = await fetch(`${API_URL}/activities/${id}`);
    if (!res.ok) throw new Error("Failed to fetch activity");
    return await res.json();
}

export async function createActivity(data: ActivityCreateFields): Promise<Activity> {
    const res = await fetch(`${API_URL}/activities`, {
        method: "POST",
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create activity");
    return await res.json();
}

export async function updateActivity(id: number, data: ActivityUpdateFields): Promise<Activity> {
    const res = await fetch(`${API_URL}/activities/${id}`, {
        method: "PUT",
        headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update activity");
    return await res.json();
}

export async function deleteActivity(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/activities/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete activity");
}


//----------------NEW HAS JOINEED


export async function getActivityHasJoined(id: number) {
    const res = await fetch(`${API_URL}/activities/${id}/has-joined`, {
        headers: getAuthHeaders(),
    });

    if (!res.ok) {
        throw new Error("Failed to fetch activity (hasJoined)");
    }

    return res.json();
}


