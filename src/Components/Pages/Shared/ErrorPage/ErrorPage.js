import React from 'react';

import Lottie from "lottie-react";

import err from '../../../assets/robo-err.json';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {

    const error = useRouteError();

    return (


        <section>

            <div className="min-h-screen">

                <div className="flex items-center justify-center py-9 md:py-40 lg:py-8">

                    <div className="flex items-center justify-center mx-4 w-11/12 md:w-2/3 h-full bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-500">

                        <div className="flex flex-col items-center py-16 ">

                            <Lottie animationData={err} loop={true} className='w-96 mx-auto rounded-lg' />

                            <h1 className="px-4 pt-8 pb-4 text-center text-5xl font-bold leading-10 text-blue-700">Error!</h1>

                            {
                                error && (
                                    <div>
                                        <p className='text-red-600 text-2xl font-semibold md:text-3xl px-5 text-justify py-3'>
                                            {
                                                error.statusText || error.message
                                            }
                                        </p>

                                        <p className="text-cyan-400 text-3xl pb-2 font-semibold text-center">
                                            {
                                                error.status
                                            }
                                        </p>
                                    </div>
                                )}

                            <p className="px-4 pb-10 leading-none text-center text-white text-xl font-semibold">No signal here! we cannot find the page you are looking for..!</p>

                            <button className="mx-4 px-4 py-2 border rounded-md text-white text-base bg-blue-700 hover:bg-blue-400 hover:font-semibold hover:px-10 hover:ease-in-out hover:text-black duration-1000 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-cyan-600">
                                <Link to='/' >Back to Homepage</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </section>

    );
};

export default ErrorPage;

