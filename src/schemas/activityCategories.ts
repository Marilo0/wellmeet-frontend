export const ACTIVITY_CATEGORIES = [
    "Workout",
    "Yoga",
    "Hiking",
    "Meditation",
    "Other",
] as const;

export type ActivityCategory = (typeof ACTIVITY_CATEGORIES)[number];