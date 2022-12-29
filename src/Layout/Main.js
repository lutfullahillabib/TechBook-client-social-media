import React, { useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Footer from '../Components/Pages/Shared/Footer/Footer';
import LeftNav from '../Components/Pages/Shared/LeftNav/LeftNav';

import logo from '../Components/assets/TechBook.png';

import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbBrandMessenger } from "react-icons/tb";
import { AuthContext } from '../Components/Contexts/AuthProvider';

const Main = () => {

    const { user, logOut } = useContext(AuthContext);
    console.log(user);

    const signOut = () => {
        logOut().then().catch();
    };


    const menuItems = <>

        <Link to="/" className="lg:flex justify-center items-center gap-3 text-xl hover:text-blue-600 duration-1000 font-semibold p-1 rounded-xl hidden text-white">

            <img src={logo} className='md:w-12 md:h-12 h-8 w-8' alt="logo" />

            <span>TechBook</span>

        </Link>

        <li className='rounded-lg hover:bg-blue-600/25 duration-1000 pointer'>
            <NavLink to="/" className='border-2 border-blue-600 rounded-lg flex gap-2 px-4 py-2 justify-center items-center'> <AiOutlineHome className='text-xl' /> Media </NavLink>
        </li>

        <li className='rounded-lg hover:bg-blue-600/25 duration-1000 pointer'>
            <NavLink to="/explore" className='border-2 border-blue-600 rounded-lg flex gap-2 px-4 py-2 justify-center items-center'> <MdOutlineExplore className='text-xl' /> #Explore</NavLink>
        </li>

        <li className='rounded-lg hover:bg-blue-600/25 duration-1000 pointer'>
            <NavLink to="/profile" className='border-2 border-blue-600 rounded-lg flex gap-2 px-4 py-2 justify-center items-center'> <CgProfile className='text-xl' /> Profile</NavLink>
        </li>

        <li className='rounded-lg hover:bg-blue-600/25 duration-1000 pointer'>
            <NavLink to="/messages" className='border-2 border-blue-600 rounded-lg flex gap-2 px-4 py-2 justify-center items-center'> <TbBrandMessenger className='text-xl' /> Messages</NavLink>
        </li>

        <li className='rounded-lg hover:bg-blue-600/25 duration-1000 pointer'>
            <NavLink to="/notifications" className='border-2 border-blue-600 rounded-lg flex gap-2 px-4 py-2 justify-center items-center'> <IoMdNotificationsOutline className='text-xl' /> #Notifications</NavLink>
        </li>

        <li className='rounded-lg hover:bg-blue-600/25 duration-1000 pointer'>
            <NavLink to="/bookmarks" className='border-2 border-blue-600 rounded-lg flex gap-2 px-4 py-2 justify-center items-center'> <BsBookmark /> #Bookmarks</NavLink>
        </li>

    </>

    const userSign = <>

        {/* <li className='bg-blue-700 rounded-lg hover:bg-blue-600/50 duration-1000 pointer'>
            <NavLink to="/signin" className='flex gap-2 px-4 py-2 justify-center items-center'>Sign In</NavLink>
        </li> */}

        {/* <li className='bg-blue-700 rounded-lg hover:bg-blue-600/50 duration-1000 pointer'>
            <NavLink to="/signup" className='flex gap-2 px-4 py-2 justify-center items-center'>Sign Up</NavLink>
        </li> */}

        {/* <li className='bg-red-600 rounded-lg hover:bg-red-600/50 duration-1000 pointer'>
            <NavLink to="/signout" className='flex gap-2 px-4 py-2 justify-center items-center'>Sign Out</NavLink>
        </li> */}


        <div>

            {
                user?.uid ? (
                    <>

                        <div className="dropdown dropdown-top w-full  rounded-3xl">

                            <label tabIndex={0} className="m-1 ">

                                <div className="flex justify-between items-center w-full cursor-pointer border-2 border-gray-500 rounded-full p-1 tooltip tooltip-top tooltip-primary"

                                    data-tip={user?.displayName}
                                    title={user?.displayName}

                                >

                                    <div className="flex justify-center items-center gap-3">

                                        <div className="avatar online">

                                            <div className="w-12 rounded-full ring-2 ring-blue-600">
                                                {/* ring-2 ring-blue-600 */}

                                                <img src={user?.photoURL} alt='Profile'
                                                    title={user?.displayName}
                                                    className='h-12 w-12 rounded-full border-2 border-white'

                                                    onError={({ currentTarget }) => {
                                                        currentTarget.onerror = null;  // prevents looping
                                                        currentTarget.src = "https://img.icons8.com/clouds/100/000000/no-image.png";
                                                    }}
                                                />

                                            </div>

                                        </div>

                                        <div >
                                            <p className="font-semibold text-sm">

                                                {user?.displayName.length >= 10 ? user?.displayName.slice(0, 10) + '...' : user?.displayName.length}

                                                {/* {`Md. Lutfullahil Labib`.length >= 10 ? `Md. Lutfullahil Labib`.slice(0, 10) + '...' : `Md. Lutfullahil Labib`} */}

                                            </p>
                                        </div>

                                    </div>

                                    <span className=" p-2 rounded-full transition duration-1000 ">
                                        {/* border-blue-600 border-2 */}
                                        <BsThreeDots className='text-2xl' />
                                    </span>

                                </div>

                            </label>

                            <ul
                                tabIndex={0}
                                className="dropdown-content menu p-2 shadow bg-red-600 hover:bg-red-600/50 duration-1000 rounded-box w-52 cursor-pointer"
                            >

                                <li>

                                    <span onClick={signOut} className='text-center block p-0 m-0'>Sign Out</span>

                                </li>

                            </ul>

                        </div>

                    </>

                ) : (

                    <>

                        <label htmlFor="login">

                            <li className='bg-blue-700 rounded-lg hover:bg-blue-600/50 duration-1000 pointer flex gap-2 px-4 py-2 justify-center items-center cursor-pointer'>
                                Sign In
                            </li>

                        </label>

                    </>
                )
            }

        </div>

    </>

    return (
        <section>

            <LeftNav></LeftNav>

            <nav className="drawer drawer-mobile lg:h-[100vh] h-[calc(100vh-58px)]">

                <input
                    id="left-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                // checked={drawer}
                />

                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>


                <div className="drawer-side lg:border-r-2 border-gray-500">

                    <label htmlFor="left-drawer" className="drawer-overlay"></label>

                    <ul className="flex flex-col relative gap-2 justify-between p-6 w-60 border-r-2 border-gray-500 lg:border-r-0 bg-black text-white font-semibold">
                        {/* bg */}

                        {/* <ul className="menu gap-2 justify-between p-4 w-60 bg "> */}

                        <div className='flex flex-col gap-2'>
                            {menuItems}

                        </div>

                        <div className='flex flex-col gap-2'>
                            {userSign}
                        </div>

                    </ul>

                </div>

            </nav>

            <Footer></Footer>

        </section>
    );
};

export default Main;

