import {useEffect, useState} from "react";
import {getActivities} from "@/services/api.activities.ts";
import type {Activity, ActivityFilters} from "@/schemas/activities.ts";
import {Button} from "@/components/ui/button.tsx";
import ActivityCard from "@/components/activities/ActivityCard";
import {useNavigate} from "react-router";



const ActivitiesPage=()=>{
    const [activities, setActivities] = useState<Activity[]>([]);
    const [pagination, setPagination] = useState({
        totalRecords: 0,
        pageNumber: 1,
        pageSize: 5,
    });
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<ActivityFilters>({
        title: "",
        category: "",
        city: "",
        isJoinable: undefined,
        upcomingOnly:false,
        pastOnly:false,
    })

    const totalPages = Math.ceil(
        pagination.totalRecords / pagination.pageSize
    );
    const navigate = useNavigate();


    useEffect(() => {
        console.log("Page:", page);
        console.log("Filters:", filters);
        getActivities(page,pagination.pageSize, filters)
            .then(res => {
            setActivities(res.data);             // <-- THE ARRAY
            setPagination({
                totalRecords: res.totalRecords,
                pageNumber: res.pageNumber,
                pageSize: res.pageSize,
            })
            console.log("Api response:", res);
        })
            // .finally(()=> setLoading(false));
    }, [page, filters]);



    return (

        <div className="p-8 max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl text-center sm:text-left">Activities</h1>



                <Button className="bg-orange-800 hover:bg-red-900" onClick={() => navigate("/activities/new")}>
                    + Create
                </Button>

            </div>
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                    {/* Search by title */}
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={filters.title ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFilters(prev => ({ ...prev, title: e.target.value }));
                            setPage(1);
                        }}

                        className="border rounded px-3 py-2"
                    />

                    {/* Category */}
                    <select
                        value={filters.category ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setFilters(prev => ({ ...prev, category: e.target.value }));
                            setPage(1);
                        }}

                        className="border rounded px-3 py-2"
                    >
                        <option value="">All categories</option>
                        <option value="Workout">Workout</option>
                        <option value="Yoga">Yoga</option>
                        <option value="Hiking">Hiking</option>
                        <option value="Meditation">Meditation</option>
                        <option value="Other">Other</option>
                    </select>

                    {/* City */}
                    <input
                        type="text"
                        placeholder="City"
                        value={filters.city ?? ""}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFilters(prev => ({ ...prev, city: e.target.value }));
                            setPage(1);
                        }}

                        className="border rounded px-3 py-2"
                    />

                    {/* Time filter */}
                    <select
                        value={
                            filters.upcomingOnly
                                ? "upcoming"
                                : filters.pastOnly
                                    ? "past"
                                    : "all"
                        }
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            const value = e.target.value;

                            if (value === "upcoming") {
                                setFilters(prev => ({
                                    ...prev,
                                    upcomingOnly: true,
                                    pastOnly: false,
                                }));
                            } else if (value === "past") {
                                setFilters(prev => ({
                                    ...prev,
                                    upcomingOnly: false,
                                    pastOnly: true,
                                }));
                            } else {
                                setFilters(prev => ({
                                    ...prev,
                                    upcomingOnly: false,
                                    pastOnly: false,
                                }));
                            }

                            setPage(1);
                        }}

                        className="border rounded px-3 py-2"
                    >
                        <option value="all">All activities</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="past">Past</option>
                    </select>


                    {/* Joinable */}
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={filters.isJoinable ?? false}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setFilters(prev => ({
                                    ...prev,
                                    isJoinable: e.target.checked ? true : undefined,
                                }));
                                setPage(1);
                            }}

                        />
                         Joinable
                    </label>

                </div>
            </div>


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

                {activities.map(activity => (
                    <ActivityCard
                        key={activity.id}
                        activity={activity}
                        onDetails={(id) => navigate(`/activities/${id}`)}
                        // onJoin={(id) => {       tbd when user-aware dto (getActivitiesHasJoined(id) instead of getActivity(id))
                        //     console.log("Join activity", id);
                        // }}
                    />
                ))}

            </div>


            {/*pagination*/}
            <div className="flex justify-center items-center gap-4 mt-6">
                <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                >
                    Previous
                </Button>

                <span className="text-sm">
                Page {pagination.pageNumber} of {totalPages}
              </span>

                <Button
                    variant="outline"
                    disabled={page === totalPages || totalPages === 0}
                    onClick={() => setPage(p => p + 1)}
                >
                    Next
                </Button>
            </div>

        </div>



);

}

export default ActivitiesPage;