import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

import { getActivity, updateActivity } from "@/services/api.activities";
import type { Activity, ActivityUpdateFields } from "@/schemas/activities";
import { isoToDatetimeLocal, toIsoUtc } from "@/utils/datetime";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditActivityPage = () => {
    const { id } = useParams<{ id: string }>();
    const activityId = Number(id);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [activity, setActivity] = useState<Activity | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [startLocal, setStartLocal] = useState("");
    const [endLocal, setEndLocal] = useState("");
    const [maxParticipants, setMaxParticipants] = useState<number>(2);

    useEffect(() => {
        if (!id || Number.isNaN(activityId)) {
            toast.error("Invalid activity id");
            navigate("/dashboard");
            return;
        }

        getActivity(activityId)
            .then((a) => {
                setActivity(a);
                setTitle(a.title ?? "");
                setDescription(a.description ?? "");
                setCity(a.city ?? "");
                setLocation(a.location ?? "");
                setCategory(a.category ?? "");
                setStartLocal(isoToDatetimeLocal(a.startDateTime));
                setEndLocal(isoToDatetimeLocal(a.endDateTime));
                setMaxParticipants(a.maxParticipants ?? 2);
            })
            .catch(() => toast.error("Failed to load activity"))
            .finally(() => setLoading(false));
    }, [id, activityId, navigate]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activity) return;

        const payload: ActivityUpdateFields = {
            title,
            description: description || undefined,
            city,
            location,
            category,
            startDateTime: toIsoUtc(startLocal),
            endDateTime: toIsoUtc(endLocal),
            maxParticipants,
        };

        try {
            setIsSubmitting(true);
            await updateActivity(activity.id, payload);
            toast.success("Activity updated");
            navigate("/dashboard"); // back to dashboard
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Update failed");
        } finally {
            setIsSubmitting(false);
        }

    };

    if (loading) return <p className="p-8 text-center">Loading…</p>;
    if (!activity) return <p className="p-8 text-center text-red-500">Activity not found</p>;

    return (
        <div className="min-h-full ">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Edit Activity</h1>
                    <Button variant="outline" onClick={() => navigate(-1)}>
                        ← Back
                    </Button>
                </div>

                <form
                    onSubmit={onSubmit}
                    className="rounded-2xl border border-orange-100 bg-white shadow-sm p-6 space-y-5"
                >
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="start">Start date/time</Label>
                            <Input
                                id="start"
                                type="datetime-local"
                                value={startLocal}
                                onChange={(e) => setStartLocal(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="end">End date/time</Label>
                            <Input
                                id="end"
                                type="datetime-local"
                                value={endLocal}
                                onChange={(e) => setEndLocal(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="max">Max participants</Label>
                        <Input
                            id="max"
                            type="number"
                            min={2}
                            value={maxParticipants}
                            onChange={(e) => setMaxParticipants(Number(e.target.value))}
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/dashboard")}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save changes"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditActivityPage;
