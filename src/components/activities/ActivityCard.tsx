import type { Activity } from "@/schemas/activities";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {Pencil, Trash2} from "lucide-react";

type ActivityCardProps = {
    activity: Activity;
    onDetails?: (id: number) => void;
    // onJoin?: (id: number) => void;


    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
    deleting?: boolean;
};

const ActivityCard = ({
                          activity,
                          onDetails,
                          // onJoin,
                          onEdit,
                          onDelete,
                          deleting,
                      }: ActivityCardProps) => {
    const { userId } = useAuth();

    const isMine =
        activity.creator?.id !== undefined &&
        userId !== null &&
        activity.creator.id.toString() === userId;

    const isClosed = !activity.isJoinable;

    return (
        <div className="border rounded-lg p-4 flex flex-col gap-3 bg-white shadow-sm">
            {/* Title + status */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="font-semibold text-lg">{activity.title}</h2>
                    <p className="text-sm text-gray-600">
                        {activity.category} · {activity.city}
                    </p>
                </div>

                {/* STATUS LABEL */}
                {isMine ? (
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
            Created by you
          </span>
                ) : isClosed ? (
                    <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-600">
            Closed
          </span>
                ) : (
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
            Joinable
          </span>
                )}
            </div>

            {/* Date & capacity */}
            <div className="text-sm text-gray-700 flex gap-4">
                <span>🕒 {new Date(activity.startDateTime).toLocaleDateString()}</span>
                <span>
          👥 {activity.currentParticipants}/{activity.maxParticipants}
        </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => onDetails?.(activity.id)}>
                    Details
                </Button>

                {/* JOIN BUTTON — ONLY WHEN ALLOWED */  }
                {/*tbd later when user-aware (hasJoined) dto is used*/}
                {/*{!isMine && !isClosed && onJoin && (*/}
                {/*    <Button size="sm" onClick={() => onJoin(activity.id)}>*/}
                {/*        Join*/}
                {/*    </Button>*/}
                {/*)}*/}

                {/* NEW: EDIT/DELETE — ONLY FOR YOUR OWN */}
                {isMine && onEdit && (
                    <Button
                        variant="secondary"
                        size="icon-sm"
                        onClick={() => onEdit(activity.id)}
                        className="hover:bg-orange-200"
                        aria-label="Edit activity"
                    >
                        <Pencil />
                        <span className="sr-only">Edit</span>
                    </Button>
                )}

                {isMine && onDelete && (
                    <Button
                        variant="destructive"
                    size="icon-sm"
                    disabled={deleting}
                    onClick={() => onDelete(activity.id)}
                        className="hover:bg-red-800"
                    aria-label="Delete activity"
                    >   <Trash2 />
                        <span className="sr-only">
                            {deleting ? "Deleting" : "Delete"}
                        </span>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ActivityCard;
