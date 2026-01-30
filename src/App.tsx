import {BrowserRouter, Route, Routes} from "react-router";
import Layout from "@/components/Layout/Layout.tsx";
import HomePage from "@/components/pages/HomePage.tsx";
import ActivitiesPage from "@/components/pages/ActivitiesPage.tsx";
import ActivityDetailsPage from "@/components/pages/ActivityDetailsPage.tsx";
// import ScrollToTop from "@/utils/ScrollToTop.tsx";
import LoginPage from "@/components/pages/LoginPage.tsx";
import DashboardPage from "@/components/pages/DashboardPage.tsx";
import {AuthProvider} from "@/context/AuthProvider.tsx";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import {Toaster} from "sonner";
import CreateActivityPage from "@/components/pages/CreateActivityPage.tsx";
import EditActivityPage from "@/components/pages/EditActivityPage.tsx";
import SignupPage from "@/components/pages/SignupPage.tsx";
import AdminUsersPage from "@/components/pages/AdminUsersPage.tsx";
// import {useEffect} from "react";


function App() {


    //check for hard reload
    // useEffect(() => {
    //     console.log("APP MOUNT");
    // }, []);

    return (

        <AuthProvider>
            <BrowserRouter>
                {/*<ScrollToTop />*/}
                <Toaster richColors position="top-right" />
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<HomePage />} />

                        {/* AUTH */}
                        <Route path="/auth/login" element={<LoginPage />} />
                        <Route path="/auth/signup" element={<SignupPage />} />

                        {/* ACTIVITIES */}
                        <Route path="/activities" element={<ActivitiesPage />} />
                        <Route path="/activities/:id" element={<ActivityDetailsPage />} />

                        {/* PROTECTED ROUTES */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<DashboardPage />} />
                            <Route path="/activities/new" element={<CreateActivityPage />} />
                            <Route path="/activities/:id/edit" element={<EditActivityPage />} />
                            <Route path="/users" element={<AdminUsersPage />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App
