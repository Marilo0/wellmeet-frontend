import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type LoginFields, loginSchema } from "@/schemas/login";
import { useNavigate, Link } from "react-router";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFields>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFields) => {
        try {
            await loginUser(data);
            toast.success("Welcome back!");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Login failed");
        }
    };

    return (
        <div className="pt-16 flex items-center justify-center px-4">
            {/* Wrapper */}
            <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl border border-orange-100 shadow-sm bg-white">

                {/* Left image */}
                <div className="hidden md:block md:w-1/2">
                    <img
                        src="/login.png"
                        alt="WellMeet wellness"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Right card */}
                <div className="w-full md:w-1/2 p-6 md:p-8">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold text-gray-900">Sign in</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Use your WellMeet account to continue
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-6 space-y-4"
                        autoComplete="off"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="username"
                                {...register("username")}
                                aria-invalid={!!errors.username}
                            />
                            {errors.username && (
                                <p className="text-sm text-red-600">{errors.username.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="password"
                                {...register("password")}
                                aria-invalid={!!errors.password}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        <Button disabled={isSubmitting} className="w-full">
                            {isSubmitting ? "Logging in..." : "Login"}
                        </Button>

                        <div className="pt-2 text-center text-sm text-gray-600">
                            No account?{" "}
                            <Link
                                to="/auth/signup"
                                className="font-medium text-orange-700 hover:underline"
                            >
                                Create one
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}
