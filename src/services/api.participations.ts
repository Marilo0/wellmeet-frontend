import { getAuthHeaders } from "@/utils/helpers";

const API_URL = import.meta.env.VITE_API_URL;

export async function joinActivity(activityId: number) {
    const res = await fetch(`${API_URL}/participations/${activityId}/join`, {
        method: "POST",
        headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error("Join failed");
}

export async function leaveActivity(activityId: number) {
    const res = await fetch(`${API_URL}/participations/${activityId}/leave`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error("Leave failed");
}
