// import {Link} from "react-router";
//
// const HomePage1 = () => {
//     return (
//         <div className="flex min-h-[89vh] pt-20  bg-gradient-to-b from-orange-100 to-white">
//
//
//
//             <div className="flex-grow container mx-auto lg:pl-20  flex flex-col  pt-10 lg:flex-row items-center justify-between">
//
//                 {/* Left – Text & CTA */}
//                 <div className="text-center flex flex-col items-center mx-auto">
//
//                     <h1 className="text-4xl md:text-5xl   font-['Poppins'] font-bold mb-6 text-gray-900">
//                         Wellness starts with connection <br />
//                         <span className="text-orange-600">Host & join activities</span>
//                     </h1>
//
//                     {/*<p className="text-lg text-gray-800">*/}
//                     {/*    Meet like-minded people <br />*/}
//                     {/*    Try something new*/}
//                     {/*</p>*/}
//                     {/*<p className="text-xl text-gray-800 mb-10">Start with <strong className=" font-['Poppins']">Wellmeet</strong></p>*/}
//
//                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                         <Link
//                             to="/auth/login"
//                             className="bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-300 px-8 py-3 rounded-lg text-lg font-semibold shadow-sm transition-all"
//                         >
//                             Already have an account?
//                         </Link>
//
//                         <Link
//                             to="/auth/login"
//                             className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition-all"
//                         >
//                             Sign up
//                         </Link>
//                     </div>
//
//                 </div>
//
//                 {/* Right – Illustration */}
//                 <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
//                     <img
//                         src="../../../Dancing.png"
//                         alt="Illustration 1"
//                         className="w-auto max-h-[280px]"
//                     />
//                 </div>
//
//             </div>
//         </div>
//     );
// };
//
// export default HomePage1;


import { Link } from "react-router";

const HomePage1 = () => {
    return (
        <section className="h-full">
            <div className="container mx-auto px-4 lg:px-20 py-10 md:py-16">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
                    {/* Left */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl font-['Poppins'] font-bold text-gray-900 leading-tight">
                            Wellness starts with connection
                            <br />
                            <span className="text-red-800">Host & join activities</span>
                        </h1>

                        <p className="mt-4 text-base md:text-lg text-gray-700 max-w-xl mx-auto lg:mx-0">
                            Find yoga, hiking, meditation and more. Meet people who actually
                            want to show up.
                        </p>

                        {/* small features */}
                        <ul className="mt-6 grid gap-3 text-gray-700 max-w-xl mx-auto lg:mx-0">
                            <li className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-200 text-orange-700 text-sm">
                  ✓
                </span>
                                Join activities nearby
                            </li>
                            <li className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-200 text-orange-700 text-sm">
                  ✓
                </span>
                                Create your own events in minutes
                            </li>
                            <li className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-200 text-orange-700 text-sm">
                  ✓
                </span>
                                Keep track from your dashboard
                            </li>
                        </ul>

                        {/* CTA */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                            <Link
                                to="/auth/login"
                                className="bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 px-6 py-3 rounded-lg text-base font-semibold shadow-sm transition"
                            >
                                Sign in
                            </Link>

                            <Link
                                to="/auth/signup"
                                className="bg-red-800 hover:bg-orange-700 text-white px-6 py-3 rounded-lg text-base font-semibold shadow-md transition"
                            >
                                Create account
                            </Link>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <div className="relative">
                            {/* soft “card” behind image */}
                            <div className="absolute inset-0 -z-10 blur-2xl bg-orange-200/60 rounded-full" />
                            <img
                                src="/Dancing.png"
                                alt="WellMeet illustration"
                                className="w-auto max-h-[320px] md:max-h-[380px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomePage1;
