export const ACTIVITY_CATEGORIES = [
    "Workout",
    "Yoga",
    "Hiking",
    "Meditation",
    "Arts",
    "Music",
    "Education",
    "Social",
    "Volunteering",
    "Gaming",
    "Other",
] as const;

export type ActivityCategory = (typeof ACTIVITY_CATEGORIES)[number];