import { Button } from "@/components/ui/button";
import type {ActivityParticipant} from "@/schemas/activities.ts";


type JoinedActivityCardProps = {
    joined: ActivityParticipant;
    onDetails?: (activityId: number) => void;
};


const JoinedActivityCard = ({ joined, onDetails }: JoinedActivityCardProps) => {
    return (
        <div className="border rounded-lg p-4 flex flex-col gap-3 bg-white shadow-sm">

            {/* Title */}
            <div>
                <h2 className="font-semibold text-lg">
                    {joined.activityTitle ?? "(Untitled activity)"}
                </h2>
                <p className="text-sm text-gray-600">
                    Joined on {new Date(joined.joinDate).toLocaleDateString()}
                </p>
            </div>

            {/* Date */}
            <div className="text-sm text-gray-700">
                🕒 {new Date(joined.activityStartDateTime).toLocaleDateString()}
            </div>

            {/* Actions */}
            <div className="flex justify-end">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDetails?.(joined.activityId)}
                >
                    Details
                </Button>
            </div>
        </div>
    );
};

export default JoinedActivityCard;
