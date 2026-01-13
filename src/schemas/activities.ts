import { z } from "zod";
import  {userReadOnlySchema} from "@/schemas/users.ts";


export const activityCreateSchema = z.object({
    // id: z.coerce.number().int(),
    title: z.string().min(1, { message: "Required" }),
    description: z.string().optional(),

    city: z.string().min(1, { message: "Required" }),
    location: z.string().min(1, { message: "Required" }),
    category: z.string().min(1, { message: "Required" }),

    startDateTime: z.iso.datetime(),
    endDateTime: z.iso.datetime(),

    maxParticipants: z.coerce.number().int().min(2, {message: "Not less than 2"}),
    // currentParticipants: z.coerce.number().int(),

    // creator: z.object(userReadOnlySchema),
    //
    // insertedAt: z.iso.datetime(),
    //
    // isJoinable: z.boolean(),
    // hasStarted: z.boolean(),
    // hasEnded: z.boolean(),
    // isOngoing: z.boolean(),
    // timeStatus: z.string(),
});

export type ActivityCreateFields = z.infer<typeof activityCreateSchema>;

//---------------------------------------------------------

export const activitySchema = z.object({
    id: z.coerce.number().int(),
    title: z.string(),
    description: z.string().optional(),

    city: z.string(),
    location: z.string(),
    category: z.string(),

    startDateTime: z.iso.datetime(),
    endDateTime: z.iso.datetime(),

    maxParticipants: z.coerce.number().int(),
    currentParticipants: z.coerce.number().int(),

    creator: userReadOnlySchema,

    insertedAt: z.iso.datetime(),

    isJoinable: z.boolean(),
    hasStarted: z.boolean(),
    hasEnded: z.boolean(),
    isOngoing: z.boolean(),

    timeStatus: z.string(),
});

export type Activity = z.infer<typeof activitySchema>

//--------------
export const activityUpdateSchema = activityCreateSchema.partial();
export type ActivityUpdateFields = z.infer<typeof activityUpdateSchema>;


//-----TYPE-------Paginated

export type PaginatedResult<T> = {
    data: T[];
    totalRecords: number;
    pageNumber: number;
    pageSize: number;
};

//----FILTERS
export type ActivityFilters = {
    title?: string;
    category?: string;
    city?: string;
    location?: string;
    isJoinable?: boolean;
    hasStarted?: boolean;
    hasEnded?: boolean;
    upcomingOnly?: boolean;
    pastOnly?: boolean;
};


//type PaginatedActivities = PaginatedResult<Activity>;
// type PaginatedUsers = PaginatedResult<UserReadOnly>;

//----------ActivityParticipantReadOnlyDTO
export const activityParticipantSchema = z.object({
    id: z.number(),
    userId: z.number(),
    username: z.string().optional(),

    activityId: z.number(),
    activityTitle: z.string().optional(),
    activityStartDateTime: z.string(),
    joinDate: z.string(),
});

export type ActivityParticipant = z.infer<typeof activityParticipantSchema>;

//NEWWV

export type ActivityHasJoined = Activity & {
    hasJoined: boolean;
};



