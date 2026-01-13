import { Link } from "react-router";
import {useEffect} from "react";

const HomePage = () => {
    const links = [
        {path: "/", label: "Home Page"},
        {path: "/activities", label: "Activities"},
    //     {path: "/activities/12", label: "Activity (ID:12)"},
        {path: "/auth/login", label: "Login"},
    ];

    useEffect(()=> {
        document.title = "Wellmeet Home Page";
    }, []);

    return (
        <>
            {/*<div className="relative w-full py-20 flex items-center justify-center overflow-hidden min-h-[calc(100vh-4rem)]">*/}
            {/*    /!* Enhanced Background - Stronger for both themes *!/*/}
            {/*    <div className="absolute inset-0 overflow-hidden pointer-events-none">*/}
            {/*        <div className="absolute inset-0 bg-gray-800 dark:bg-[#0a0a0a]"></div>*/}

            {/*    </div>*/}
            {/*</div>*/}

            <h1 className="text-2xl text-center bg-blue-700 my-12">Home Page</h1>
            <div className="flex flex-col bg-wm-dark-gray items-start max-w-sm mx-auto gap-4 ">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className="bg-gray-200 w-full px-4 py-2 rounded"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>


        </>
    )
}
export default HomePage;