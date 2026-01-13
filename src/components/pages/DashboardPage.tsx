import { useEffect, useState } from "react";
import { getDashboard } from "@/services/api.dashboard";
import ActivityCard from "@/components/activities/ActivityCard";
import JoinedActivityCard from "@/components/activities/JoinActivityCard";
import type { Dashboard } from "@/schemas/dashboard";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { deleteActivity } from "@/services/api.activities";
import { toast } from "sonner";

const DashboardPage = () => {
    const [dashboard, setDashboard] = useState<Dashboard | null>(null);
    const [showAllCreated, setShowAllCreated] = useState(false);
    const [showAllJoined, setShowAllJoined] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const navigate = useNavigate();

    const loadDashboard = async () => {
        try {
            const data = await getDashboard();
            setDashboard(data);
        } catch (e) {
            console.error(e);
            toast.error("Failed to load dashboard");
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    const goToActivityDetails = (activityId: number) => {
        navigate(`/activities/${activityId}`);
    };

    const goToEditActivity = (activityId: number) => {
        navigate(`/activities/${activityId}/edit`);
    };

    const handleDeleteCreated = async (activityId: number) => {
        const ok = confirm("Delete this activity? This cannot be undone.");
        if (!ok) return;

        try {
            setDeletingId(activityId);
            await deleteActivity(activityId);
            toast.success("Activity deleted");
            await loadDashboard();
        } catch (e) {
            console.error(e);
            toast.error(e instanceof Error ? e.message : "Delete failed");
        } finally {
            setDeletingId(null);
        }
    };

    if (!dashboard) return <p className="p-8 text-center">Loading…</p>;

    const createdToShow = showAllCreated
        ? dashboard.createdActivities
        : dashboard.createdActivities.slice(0, 3);

    const joinedToShow = showAllJoined
        ? dashboard.joinedActivities
        : dashboard.joinedActivities.slice(0, 3);

    const toggleLinkClass =
        "text-sm font-medium text-orange-700 hover:text-orange-800 hover:underline";

    const statCardClass =
        "rounded-2xl border border-orange-100 bg-white shadow-sm p-6";

    return (
        <div className="min-h-full">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {/* Profile illustration / avatar */}
                        <div className="h-14 w-14 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center overflow-hidden">


                            <img
                            src="/avatar.png"
                            alt="Profile"
                            className="h-full w-full object-cover scale-150"
                             />
                        </div>

                        <div className="space-y-1">
                            <h1 className="text-3xl font-semibold text-gray-900">
                                Welcome, {dashboard.user.firstname} 👋
                            </h1>
                            <p className="text-sm text-gray-600">
                                Here’s what’s happening with your activities.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => navigate("/activities")}>
                            Search Activities
                        </Button>
                        <Button onClick={() => navigate("/activities/new")}>
                            Create Activity
                        </Button>
                    </div>
                </div>


                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className={statCardClass}>
                        <p className="text-sm text-gray-600">Created Activities</p>
                        <div className="mt-2 flex items-end justify-between">
                            <p className="text-4xl font-bold text-gray-900">
                                {dashboard.totalCreatedActivities}
                            </p>
                        </div>
                    </div>

                    <div className={statCardClass}>
                        <p className="text-sm text-gray-600">Joined Activities</p>
                        <div className="mt-2 flex items-end justify-between">
                            <p className="text-4xl font-bold text-gray-900">
                                {dashboard.totalJoinedActivities}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Lists */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Created */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">
                                My Activities
                            </h2>
                        </div>

                        <div className="rounded-2xl border border-orange-100 bg-white shadow-sm p-4">
                            {dashboard.createdActivities.length === 0 ? (
                                <p className="text-gray-600">
                                    You haven’t created any activities yet.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {createdToShow.map((a) => (
                                        <ActivityCard
                                            key={a.id}
                                            activity={a}
                                            onDetails={goToActivityDetails}
                                            onEdit={goToEditActivity}
                                            onDelete={handleDeleteCreated}
                                            deleting={deletingId === a.id}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        {dashboard.createdActivities.length > 3 && (
                            <div className="mt-4 flex justify-center">
                                <button
                                    className={toggleLinkClass}
                                    onClick={() => setShowAllCreated(v => !v)}
                                >
                                    {showAllCreated ? "Show less" : "Show more"}
                                </button>
                            </div>
                        )}

                    </section>

                    {/* Joined */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Joined Activities
                            </h2>


                        </div>

                        <div className="rounded-2xl border border-orange-100 bg-white shadow-sm p-4">
                            {dashboard.joinedActivities.length === 0 ? (
                                <p className="text-gray-600">
                                    You haven’t joined any activities yet.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {joinedToShow.map((j) => (
                                        <JoinedActivityCard
                                            key={j.activityId}
                                            joined={j}
                                            onDetails={goToActivityDetails}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {dashboard.joinedActivities.length > 3 && (
                            <div className="mt-4 flex justify-center">
                                <button
                                    className={toggleLinkClass}
                                    onClick={() => setShowAllJoined(v => !v)}
                                >
                                    {showAllJoined ? "Show less" : "Show more"}
                                </button>
                            </div>
                        )}

                    </section>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
