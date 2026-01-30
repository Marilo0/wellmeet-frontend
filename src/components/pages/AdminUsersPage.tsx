import { useEffect, useState } from "react";
import type { UserReadOnly } from "@/schemas/users";
import { getUsers } from "@/services/api.users";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const AdminUsersPage = () => {
    const { userRole } = useAuth();
    const [users, setUsers] = useState<UserReadOnly[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        getUsers()
            .then((response) => {
                if (cancelled) return;
                const normalized = Array.isArray(response.data)
                    ? response.data
                    : (response as unknown as { Data?: UserReadOnly[] }).Data ?? [];
                setUsers(normalized);
            })
            .catch(() => {
                if (!cancelled) setError("Failed to load users.");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    if (userRole !== "Admin") {
        return <Navigate to="/dashboard" replace />;
    }

    if (loading) {
        return <p className="p-8 text-center">Loading users…</p>;
    }

    if (error) {
        return <p className="p-8 text-center text-red-500">{error}</p>;
    }

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
                <p className="text-sm text-gray-600">
                    View registered users and their email addresses.
                </p>
            </div>

            <div className="rounded-2xl border border-orange-100 bg-white shadow-sm p-4">
                {users.length === 0 ? (
                    <p className="text-gray-600">No users found.</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        {user.firstname} {user.lastname}
                                    </TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.userRole}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
};

export default AdminUsersPage;