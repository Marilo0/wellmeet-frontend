import { Link, NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { Menu } from "lucide-react";


import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { useAuth } from "@/hooks/useAuth";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
        "px-3 py-2 rounded-md text-sm transition",
        "hover:bg-gray-100 hover:text-black",
        isActive ? "bg-gray-100 text-black" : "text-gray-700",
    ].join(" ");

const Header = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const { isAuthenticated, username, userRole, logoutUser, loading } = useAuth();

    const close = () => setOpen(false);

    const handleLogout = () => {
        logoutUser();
        setOpen(false);
        navigate("/auth/login");
    };

    // ✅ logged out -> home, logged in -> dashboard
    const logoTarget = isAuthenticated ? "/dashboard" : "/";

    return (
        <header className="fixed top-0 left-0 w-full bg-orange-100/90 backdrop-blur z-50 ">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to={logoTarget} className="flex items-center" onClick={close}>
                    <img src="/logo2.png" alt="WellMeet logo" className="h-9 w-auto" />
                </Link>

                {/* Desktop nav only when logged in */}
                {isAuthenticated && (
                    <nav
                        className={`hidden md:flex items-center gap-1 font-medium ${
                            loading ? "opacity-50 pointer-events-none" : ""
                        }`}
                    >
                        <NavLink to="/dashboard" className={navLinkClass}>
                            Dashboard
                        </NavLink>
                        <NavLink to="/activities" className={navLinkClass}>
                            Activities
                        </NavLink>

                        {/*tooo seee that later*/}
                        {userRole === "Admin" && (
                            <NavLink to="/admin" className={navLinkClass}>
                                Admin
                            </NavLink>
                        )}
                    </nav>
                )}

                {/* Desktop right: auth */}
                <div
                    className={`hidden md:flex items-center gap-2 ${
                        loading ? "opacity-50 pointer-events-none" : ""
                    }`}
                >
                    {!isAuthenticated ? (
                        <>
                            <NavLink to="/auth/login" className={navLinkClass}
                            >
                                Sign in
                            </NavLink>
                            <NavLink to="/auth/signup" className={navLinkClass}>
                                Sign up
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <div className="text-sm text-gray-600 hidden lg:block">
                                Hi,{" "}
                                <span className="font-medium text-gray-900">
                  {username ?? "user"}
                </span>
                            </div>
                            <Button variant="outline" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile */}
                <div className="md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                aria-label="Open menu"
                                disabled={loading}
                            >
                                <Menu />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="w-80">
                            <SheetHeader>
                                <SheetTitle className="flex items-center gap-2">
                                    <img src="/logo2.png" alt="WellMeet logo" className="h-8" />
                                    {/*<span>Options</span>*/}
                                </SheetTitle>
                            </SheetHeader>

                            <div
                                className={`mt-6 flex flex-col gap-2 ${
                                    loading ? "opacity-50 pointer-events-none" : ""
                                }`}
                            >
                                {/* Logged in nav only */}
                                {isAuthenticated && (
                                    <>
                                        <NavLink to="/dashboard" onClick={close} className={navLinkClass}>
                                            Dashboard
                                        </NavLink>
                                        <NavLink to="/activities" onClick={close} className={navLinkClass}>
                                            Activities
                                        </NavLink>

                                        {/*TTTOOOOOOO SEEEE THIS LATEEEEEEER*/}
                                        {userRole === "Admin" && (
                                            <NavLink to="/admin" onClick={close} className={navLinkClass}>
                                                Admin
                                            </NavLink>
                                        )}

                                        <div className="my-3 border-t" />
                                    </>
                                )}

                                {/* Auth actions */}
                                {!isAuthenticated ? (
                                    <>
                                        <NavLink to="/auth/login" onClick={close} className={navLinkClass}>
                                            Sign in
                                        </NavLink>
                                        <NavLink to="/auth/signup" onClick={close} className={navLinkClass}>
                                            Sign up
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        <div className="px-3 py-2 text-sm text-gray-600">
                                            Signed in as{" "}
                                            <span className="font-medium text-gray-900">
                        {username ?? "user"}
                      </span>
                                        </div>
                                        <Button variant="destructive" onClick={handleLogout}>
                                            Logout
                                        </Button>
                                    </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Header;
