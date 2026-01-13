// import Header from "./Header.tsx"
// import Footer from "./Footer.tsx"
// import {Outlet} from "react-router";
//
// const Layout = () => {
//     return (
//         <>
//             <Header/>
//             {/*εβγαλα το px-24..προσθεσα το πτ-16*/}
//             <main className="container pt-16 mx-auto min-h-[98vh]">
//                 <Outlet/>
//             </main>
//             <Footer/>
//         </>
//     )
// }
//
// export default Layout;

import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-100 to-white">
            <Header />

            {/* main takes remaining height */}
            <main className="flex-1 pt-16">

                <Outlet />

            </main>

            <Footer />
        </div>
    );
};

export default Layout;
