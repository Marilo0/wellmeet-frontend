import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { getActivities } from "@/services/api.activities.ts";
import type { Activity, ActivityFilters } from "@/schemas/activities.ts";
import { Button } from "@/components/ui/button.tsx";
import ActivityCard from "@/components/activities/ActivityCard";
import { useNavigate } from "react-router";
import {ACTIVITY_CATEGORIES, type ActivityCategory} from "@/schemas/activityCategories.ts";

const PAGE_SIZE = 5;

const ActivitiesPage = () => {
    const navigate = useNavigate();

    const [activities, setActivities] = useState<Activity[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);

    // RHF for filters (no zod, backend-shaped)
    type ActivityFiltersForm = Omit<ActivityFilters, "category"> & { category: ActivityCategory | "" };

    const { register, control, setValue } = useForm<ActivityFiltersForm>({
        defaultValues: {
            title: "",
            category: "",
            city: "",
            upcomingOnly: false,
            pastOnly: false,
            // keep checkbox as boolean, will normalize when sending
            isJoinable: false,
        },
        mode: "onChange",
    });

    const watched = useWatch({ control });

    // Normalize only what’s needed for correct backend semantics
    const filters: ActivityFilters = useMemo(
        () => ({
            title: (watched.title ?? "").trim(),
            category: watched.category ? watched.category : undefined,
            city: (watched.city ?? "").trim(),
            upcomingOnly: !!watched.upcomingOnly,
            pastOnly: !!watched.pastOnly,
            // checkbox false should mean "no filter", not "not joinable"
            isJoinable: watched.isJoinable ? true : undefined,
        }),
        [watched]
    );

    useEffect(() => {
        let cancelled = false;

        getActivities(page, PAGE_SIZE, filters).then((res) => {
            if (cancelled) return;
            setActivities(res.data);
            setTotalRecords(res.totalRecords);
        });

        return () => {
            cancelled = true;
        };
    }, [page, filters]);

    const totalPages = Math.ceil(totalRecords / PAGE_SIZE);

    // Dropdown is UI, but the state is backend-shaped:
    // it only manipulates upcomingOnly/pastOnly (no "time" field exists)
    const timeValue = watched?.upcomingOnly
        ? "upcoming"
        : watched?.pastOnly
            ? "past"
            : "all";

    return (
        <div className="p-8 max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl text-center sm:text-left">Activities</h1>

                <Button
                    className="bg-orange-800 hover:bg-red-900"
                    onClick={() => navigate("/activities/new")}
                >
                    + Create
                </Button>
            </div>

            {/* Filters */}
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {/* Title */}
                    <input
                        type="text"
                        placeholder="Search by title"
                        {...register("title", { onChange: () => setPage(1) })}
                        className="border rounded px-3 py-2"
                    />

                    {/* Category */}
                    <select
                        {...register("category", { onChange: () => setPage(1) })}
                        className="border rounded px-3 py-2"
                    >
                        <option value="">All categories</option>
                        {ACTIVITY_CATEGORIES.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    {/* City */}
                    <input
                        type="text"
                        placeholder="City"
                        {...register("city", { onChange: () => setPage(1) })}
                        className="border rounded px-3 py-2"
                    />

                    {/* Time: controls backend booleans (upcomingOnly/pastOnly) */}
                    <select
                        value={timeValue}
                        onChange={(e) => {
                            const value = e.target.value;

                            if (value === "upcoming") {
                                setValue("upcomingOnly", true);
                                setValue("pastOnly", false);
                            } else if (value === "past") {
                                setValue("upcomingOnly", false);
                                setValue("pastOnly", true);
                            } else {
                                setValue("upcomingOnly", false);
                                setValue("pastOnly", false);
                            }

                            setPage(1);
                        }}
                        className="border rounded px-3 py-2"
                    >
                        <option value="all">All activities</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past</option>
                    </select>

                    {/* Joinable: stored as boolean, normalized to undefined when false */}
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            {...register("isJoinable", { onChange: () => setPage(1) })}
                        />
                        Joinable
                    </label>
                </div>
            </div>

            {/* List */}
            <div className="space-y-4">
                {activities.length === 0 && (
                    <div className="text-center text-gray-500 py-12">
                        <div className="text-5xl mb-4">🧘‍♀️🌿</div>
                        <p className="text-lg font-medium">No activities found</p>
                        <p className="text-sm mt-1">
                            Try changing filters or create one yourself
                        </p>
                    </div>
                )}

                {activities.map((activity) => (
                    <ActivityCard
                        key={activity.id}
                        activity={activity}
                        onDetails={(id) => navigate(`/activities/${id}`)}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-6">
                <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                >
                    Previous
                </Button>

                <span className="text-sm">
          Page {page} of {totalPages || 1}
        </span>

                <Button
                    variant="outline"
                    disabled={totalPages === 0 || page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default ActivitiesPage;
