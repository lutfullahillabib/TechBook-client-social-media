import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Feed from './Feed';
import People from './People';
import Trending from './Trending';

const TopNav = () => {

    const [openTab, setOpenTab] = useState("feed");

    return (

        <section>

            <div className="lg:w-10/12 w-11/12 mx-auto">

                <div className="flex flex-col items-center justify-center">

                    <ul className="md:w-[37rem] w-11/12 flex justify-around fixed lg:top-5 top-20 space-x-2 bg-black rounded-lg">

                        <li className="w-full text-center">

                            <Link
                                to="/"

                                onClick={() => setOpenTab("feed")}

                                className={` ${openTab === "feed"
                                    ?
                                    "border-white"
                                    :
                                    "border-blue-600"
                                    }

                                    inline-block text-lg w-full
                                    text-white
                                    rounded-lg hover:bg-blue-600/25 duration-1000 pointer
                                    border-2 px-4 py-2 
                                    `}

                            >
                                Feed
                            </Link>

                        </li>

                        <li className="w-full text-center">

                            <Link
                                to="/"

                                onClick={() => setOpenTab("people")}

                                className={` ${openTab === "people"
                                    ?
                                    "border-white"
                                    :
                                    "border-blue-600"
                                    }

                                    inline-block text-lg w-full
                                    text-white
                                    rounded-lg hover:bg-blue-600/25 duration-1000 pointer
                                    border-2 px-4 py-2 
                                    `}

                            >
                                People
                            </Link>

                        </li>

                        <li className="w-full text-center">

                            <Link
                                to="/"

                                onClick={() => setOpenTab("trending")}

                                className={` ${openTab === "trending"
                                    ?
                                    "border-white"
                                    :
                                    "border-blue-600"
                                    }

                                    inline-block text-lg w-full
                                    text-white
                                    rounded-lg hover:bg-blue-600/25 duration-1000 pointer
                                    border-2 px-4 py-2 
                                    `}

                            >
                                Trending
                            </Link>

                        </li>

                    </ul>

                    <div className="p-3 mt-16">

                        <div className={openTab === "feed" ? "block" : "hidden"}>
                            <Feed />
                        </div>

                        <div className={openTab === "people" ? "block" : "hidden"}>
                            <People />
                        </div>

                        <div className={openTab === "trending" ? "block" : "hidden"}>
                            <Trending />
                        </div>

                    </div>

                </div>

            </div>

        </section>

    );
};

export default TopNav;


