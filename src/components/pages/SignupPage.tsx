
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

import { userRegisterSchema, type UserRegisterFields } from "@/schemas/users";
import { register as registerApi } from "@/services/api.auth";

export default function SignupPage() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UserRegisterFields>({
        resolver: zodResolver(userRegisterSchema),
    });

    const onSubmit = async (data: UserRegisterFields) => {
        try {
            await registerApi(data);
            toast.success("Account created! Please sign in.");
            navigate("/auth/login");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Registration failed");
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-sm border overflow-hidden">
                {/* Left image / info */}
                <div className="hidden md:flex relative bg-orange-100 items-end">
                    <img
                        src="/Completed.png"
                        alt="WellMeet"
                        className="absolute inset-0 object-cover h-10px"
                    />

                    <div className="relative p-8">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Join WellMeet
                        </h2>
                        <p className="text-sm text-gray-700 mt-2 max-w-sm">
                            Create activities, meet people, and explore wellness together.
                        </p>
                    </div>
                </div>


                {/* Form */}
                <div className="p-8 text-center">
                    <h1 className="text-2xl font-semibold text-gray-900">Sign up</h1>
                    <p className="text-sm text-gray-600 mt-2">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="text-orange-700 hover:underline">
                            Sign in
                        </Link>
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Firstname */}
                            <div className="space-y-2">
                                <Label htmlFor="firstname">Firstname</Label>
                                <Input id="firstname" {...register("firstname")} />
                                {errors.firstname && (
                                    <p className="text-sm text-red-600">
                                        {errors.firstname.message}
                                    </p>
                                )}
                            </div>

                            {/* Lastname */}
                            <div className="space-y-2">
                                <Label htmlFor="lastname">Lastname</Label>
                                <Input id="lastname" {...register("lastname")} />
                                {errors.lastname && (
                                    <p className="text-sm text-red-600">
                                        {errors.lastname.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Username */}
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" autoComplete="username" {...register("username")} />
                            {errors.username && (
                                <p className="text-sm text-red-600">{errors.username.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" autoComplete="email" {...register("email")} />
                            {errors.email && (
                                <p className="text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-600">{errors.password.message}</p>
                            )}

                            <p className="text-xs text-gray-500">
                                Must be 8+ chars with uppercase, lowercase, number & special character.
                            </p>
                        </div>

                        <Button className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create account"}
                        </Button>
                    </form>

                    <p className="text-xs text-gray-500 mt-4">
                        By creating an account, you agree to our terms and privacy policy.
                    </p>
                </div>
            </div>
        </div>
    );
}
