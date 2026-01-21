import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
// import { getActivity } from "@/services/api.activities";
import type {ActivityHasJoined} from "@/schemas/activities";
import { Button } from "@/components/ui/button";
import { getActivityHasJoined } from "@/services/api.activities";
import { joinActivity, leaveActivity } from "@/services/api.participations";
import {useAuth} from "@/hooks/useAuth.ts";



const ActivityDetailsPage = () => {
    const {id} = useParams<{ id: string }>();
    console.log("DETAILS PARAM:", id);
    const navigate = useNavigate();

    // const [activity, setActivity] = useState<Activity | null>(null); REPLACED WITH HAS JOINED
    const [activity, setActivity] = useState<ActivityHasJoined | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {userId} = useAuth();


    useEffect(() => {
        if (!id) return;

        getActivityHasJoined(Number(id))   //CHANGED FROM GETACTIVITY TO HAS JOINED

            .then(setActivity)
            .catch(() => setError("Activity not found"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <p className="p-8 text-center">Loading activity…</p>;
    }

    if (error || !activity) {
        return <p className="p-8 text-center text-red-500">{error}</p>;
    }

    const isMine =
        activity.creator?.id !== undefined &&
        userId !== null &&
        activity.creator.id.toString() === userId;

    return (
        <div className="p-8 max-w-3xl mx-auto space-y-6">

            <Button variant="outline" onClick={() => navigate(-1)}>
                ← Back
            </Button>

            <div className="border rounded-lg p-6 bg-white shadow-sm space-y-4">
                <h1 className="text-2xl font-semibold">{activity.title}</h1>

                <p className="text-gray-600">
                    {activity.category} · {activity.city}
                </p>

                <p className="text-gray-800">{activity.description}</p>

                <div className="text-sm text-gray-700 space-y-1">
                    <p>
                        <strong>Location:</strong> {activity.city}{activity.location ? `, ${activity.location}` : ""}
                    </p>

                    <p>
                        <strong>Date:</strong>{" "}
                        {new Date(activity.startDateTime).toLocaleString()}
                    </p>
                    <p>
                        <strong>Participants:</strong>{" "}
                        {activity.currentParticipants} / {activity.maxParticipants}
                    </p>
                    <p>
                        <strong>Host:</strong>{" "}
                        {activity.creator
                            ? `${activity.creator.firstname ?? ""} ${activity.creator.lastname ?? ""}`.trim() ||
                            activity.creator.username
                            : "—"}
                    </p>

                </div>

                <div className="flex gap-2 justify-end">
                    {isMine ? (
                        <span className="text-sm text-gray-500">You’re the host</span>
                        // or show Edit/Delete here if you want
                    ) : activity.hasJoined ? (
                        <Button
                            variant="destructive"
                            onClick={async () => {
                                try {
                                    await leaveActivity(activity.id);
                                    setActivity(prev => (prev ? { ...prev, hasJoined: false } : prev));
                                } catch {
                                    alert("Failed to leave activity");
                                }
                            }}
                        >
                            Leave
                        </Button>
                    ) : (
                        <Button
                            disabled={!activity.isJoinable}
                            onClick={async () => {
                                try {
                                    await joinActivity(activity.id);
                                    setActivity(prev => (prev ? { ...prev, hasJoined: true } : prev));
                                } catch {
                                    alert("Failed to join activity");
                                }
                            }}
                        >
                            Join
                        </Button>
                    )}
                </div>


            </div>
        </div>
    );
};

export default ActivityDetailsPage;
