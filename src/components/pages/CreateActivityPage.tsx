import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { createActivity } from "@/services/api.activities";
import type { ActivityCreateFields } from "@/schemas/activities";
import { toIsoUtc } from "@/utils/datetime";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateActivityPage = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [startLocal, setStartLocal] = useState(""); // datetime-local
    const [endLocal, setEndLocal] = useState(""); // datetime-local
    const [maxParticipants, setMaxParticipants] = useState<number>(2);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload: ActivityCreateFields = {
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
            const created = await createActivity(payload);
            toast.success("Activity created!");
            navigate(`/activities/${created.id}`);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Create failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-full">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Create Activity
                    </h1>
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
                        <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateActivityPage;
