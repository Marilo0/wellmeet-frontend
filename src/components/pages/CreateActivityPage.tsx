import { useNavigate } from "react-router";
import { toast } from "sonner";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createActivity } from "@/services/api.activities";
import { activityCreateSchema, type ActivityCreateFields } from "@/schemas/activities";
import { isoToDatetimeLocal, toIsoUtc } from "@/utils/datetime";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CreateActivityPage = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<ActivityCreateFields>({
        resolver: zodResolver(activityCreateSchema),
        defaultValues: {
            title: "",
            description: "",
            city: "",
            location: "",
            category: "",
            startDateTime: "",
            endDateTime: "",
            maxParticipants: 10, // backend default
        },
        mode: "onTouched",
    });

    const onSubmit = async (data: ActivityCreateFields) => {
        try {
            const created = await createActivity(data);
            toast.success("Activity created!");
            navigate(`/activities/${created.id}`);
        } catch {
            toast.error("Create activity failed!");
        }
    };

    return (
        <div className="min-h-full">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Create Activity</h1>
                    <Button variant="outline" onClick={() => navigate(-1)}>← Back</Button>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="rounded-2xl border border-orange-100 bg-white shadow-sm p-6 space-y-5"
                    autoComplete="off"
                >
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" {...register("title")} />
                        {errors.title && <p className="text-red-600 text-sm">⚠️ {errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" rows={4} {...register("description")} />
                        {errors.description && <p className="text-red-600 text-sm">⚠️ {errors.description.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" {...register("city")} />
                            {errors.city && <p className="text-red-600 text-sm">⚠️ {errors.city.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" {...register("location")} />
                            {errors.location && <p className="text-red-600 text-sm">⚠️ {errors.location.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" {...register("category")} />
                        {errors.category && <p className="text-red-600 text-sm">⚠️ {errors.category.message}</p>}
                    </div>

                    {/* Start */}
                    <div className="space-y-2">
                        <Label htmlFor="start">Start date/time</Label>
                        <Controller
                            control={control}
                            name="startDateTime"
                            render={({ field }) => (
                                <Input
                                    id="start"
                                    type="datetime-local"
                                    value={isoToDatetimeLocal(field.value)}
                                    onChange={(e) => field.onChange(toIsoUtc(e.target.value))}
                                />
                            )}
                        />
                        {errors.startDateTime && (
                            <p className="text-red-600 text-sm">⚠️ {errors.startDateTime.message}</p>
                        )}
                    </div>

                    {/* End */}
                    <div className="space-y-2">
                        <Label htmlFor="end">End date/time</Label>
                        <Controller
                            control={control}
                            name="endDateTime"
                            render={({ field }) => (
                                <Input
                                    id="end"
                                    type="datetime-local"
                                    value={isoToDatetimeLocal(field.value)}
                                    onChange={(e) => field.onChange(toIsoUtc(e.target.value))}
                                />
                            )}
                        />
                        {errors.endDateTime && (
                            <p className="text-red-600 text-sm">⚠️ {errors.endDateTime.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="max">Max participants</Label>
                        <Input
                            id="max"
                            type="number"
                            min={1}
                            max={100}
                            {...register("maxParticipants", {
                                valueAsNumber: true
                            })}
                        />
                        {errors.maxParticipants && (
                            <p className="text-red-600 text-sm">⚠️ {errors.maxParticipants.message}</p>
                        )}
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
