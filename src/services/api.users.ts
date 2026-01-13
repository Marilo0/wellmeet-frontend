// // api.dashboard.ts
//
// const API_URL = import.meta.env.VITE_API_URL
// export async function getDashboard() {
//     const res = await fetch(`${API_URL}/users/me/dashboard`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//
//     if (!res.ok) throw new Error("Failed to load dashboard");
//     return res.json();
// }
