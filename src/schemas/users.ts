import {z} from "zod";

// ENUM ROLES "User" | "Admin"
export const UserRole = {
    User: "User",
    Admin: "Admin",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

// from UserRegisterDTO -------------------------
export const userRegisterSchema = z.object({
    username: z.string().min(2, {message: "Username must be between 2 and 50 characters"}).max(50),
    email: z.email({message: "Invalid email address"}).max(100),
    firstname: z.string().min(2, {message: "Firstname must be between 2 and 50 characters"}).max(50),
    lastname: z.string().min(2, {message: "Lastname must be between 2 and 50 characters"}).max(50),
    password: z.string().regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?\W).{8,}$/,
        {message: "Password must be at least 8 characters and contain at least one uppercase, one lowercase, one digit and one special character"})
    //    userRole: z.string().default("User"),
});
export type UserRegisterFields = z.infer<typeof userRegisterSchema>

// from UserReadOnlyDTO ----------------------------
export const userReadOnlySchema = z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    userRole: z.enum([UserRole.User, UserRole.Admin])    //are enumerated values generated ok like that?

});
export type UserReadOnly = z.infer<typeof userReadOnlySchema>;

// from UserUpdateDto -------------------------------------
export const userUpdateSchema = z.object({
    username: z.string().min(2).max(50).optional(),
    email: z.email().max(100).optional(),
    firstname: z.string().min(2).max(50).optional(),
    lastname: z.string().min(2).max(50).optional(),
});
export type UserUpdateFields = z.infer<typeof userUpdateSchema>;


