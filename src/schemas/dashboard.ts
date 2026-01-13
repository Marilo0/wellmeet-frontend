import { z } from "zod";
import { userReadOnlySchema } from "@/schemas/users";
import { activitySchema, activityParticipantSchema } from "@/schemas/activities";


export const dashboardSchema = z.object({
    user: userReadOnlySchema,

    createdActivities: z.array(activitySchema),
    joinedActivities: z.array(activityParticipantSchema), // ✅ FIXED

    totalCreatedActivities: z.number(),
    totalJoinedActivities: z.number(),
});

export type Dashboard = z.infer<typeof dashboardSchema>;

