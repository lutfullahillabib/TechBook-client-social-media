import React from 'react';

import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import logo from '../../../assets/TechBook.png'

const LeftNav = () => {
    return (

        <section className=' sticky top-0 bg-black z-50'>

            <div className='flex justify-between items-center px-5 py-2 rounded-lg lg:hidden border-b-2 border-gray-500 '>

                <Link to="/" className="flex justify-center items-center gap-3 text-xl hover:text-blue-600 duration-1000 font-semibold p-1 rounded-xl text-white">

                    <img src={logo} className='md:w-12 md:h-12 h-8 w-8' alt="logo" />

                    <span>TechBook</span>

                </Link>

                <label htmlFor="left-drawer" tabIndex={2} className="btn btn-ghost lg:hidden text-white  transition-all border-0 duration-1000 bg-blue-600 hover:bg-blue-600/50">
                    {/* bg */}

                    <GiHamburgerMenu className='text-2xl' />

                </label>

            </div>

        </section>
    );
};

export default LeftNav;


