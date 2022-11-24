import React, { useContext, useState } from 'react'
import { FaFemale, FaGlobeAmericas, FaMemory, FaPlusCircle, FaTrash } from 'react-icons/fa';
import {ImSwitch } from "react-icons/im";
import { FiMenu } from 'react-icons/fi';
import { Link, NavLink } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';


const HeaderSub = () => {

    //@ts-ignore
    const { auth, setAuth } = useContext(AuthContext);
    const [isMenuOpen, setisMenuopen] = useState <boolean> (false);

    const logout = () => {
        localStorage.removeItem('token');
        setAuth(null);
    }

    return (
        <header id="header" className="flex flex-col bg-pink-900 bg-center bg-cover text-slate-300">

            {/* Menu starts responsive */}

            {/* Responsive nmenu */}
                    <div className={`${isMenuOpen ? "block" : "hidden"} bg-black z-50 w-full h-screen fixed p-9 text-center left-0 right-0 `}>

                <FaPlusCircle
                    className={" rotate-45 hover:text-slate-800 transition-all duration-300 cursor-pointer"}
                    size={25}
                    onClick={() => setisMenuopen(false)}
                />
                
                    <ul className="flex flex-col gap-2 content-center self-center mt-[50%] text-2xl">
                        <NavLink to="/" onClick={() => setisMenuopen(false)} className="inline-block mx-3 hover:text-blue-600 transition-all">
                            <li>Home</li>
                    </NavLink>
                    
                        <NavLink to={"/appointment"} onClick={() => setisMenuopen(false)} className="inline-block hover:text-blue-600 transition-all">
                            <li>Appointment</li>
                    </NavLink>
                    
                    <NavLink to={"/ourservices"} onClick={() => setisMenuopen(false)} className="inline-block hover:text-blue-600 transition-all">
                            <li>Our services</li>
                        </NavLink>
                        
                        <NavLink to={"/contact"} onClick={() => setisMenuopen(false)} className="inline-block mx-3 hover:text-blue-600 transition-all">
                            <li>Contact us</li>
                        </NavLink>
                        <NavLink to={"/about"} onClick={() => setisMenuopen(false)} className="inline-block mx-3 hover:text-blue-600 transition-all">
                            <li>About us</li>
                        </NavLink>

                        {
                            auth?.user?.role === 'admin' &&
                            <NavLink to={"/create-service"} onClick={() => setisMenuopen(false)} className="inline-block mx-3 hover:text-blue-600 transition-all">
                                <li>Services</li>
                            </NavLink>
                        }

                        {
                            auth?.user?.role === 'admin' &&
                            <NavLink to={"/all-appointments"} onClick={() => setisMenuopen(false)} className="inline-block mx-3 hover:text-blue-600 transition-all">
                                <li>Customers appointments</li>
                            </NavLink>
                    }
                    
                    {
                        !auth?.user ?
                            (
                                <>
                                    <NavLink to={"/login"} onClick={() => setisMenuopen(false)} className="mr-2 hover:text-blue-500">Log In</NavLink>
                                    <NavLink to={"/register"} onClick={() => setisMenuopen(false)} className="ml-2 hover:text-blue-500">Register</NavLink>
                                </>
                            ) :
                            (
                                <div className='flex self-center mt-2'>
                                    <span className="hidden sm:inline">{auth.user.email} | </span>
                                    <NavLink to={"/logout"} onClick={() => setisMenuopen(false)} className="ml-2 hover:text-blue-500">
                                        <ImSwitch size={25} className={"text-center"} />
                                    </NavLink>
                                </div>
                            )
                    }
                        </ul>
                        
                    </div>
            {/* menu end responsive */}


            {/* <div className="flex min-h-[64px] flex-col  justify-between px-2 p-4 md:p-4 content-center md:flex-row"> */}
            <div className="flex min-h-[64px] flex-row  justify-between px-2 p-4 md:p-4 content-center md:flex-row">

                <div className="w-16 flex justify-center">
                    <Link to={"/"} className={"self-center"}>
                        <FaFemale size={40} />
                    </Link>
                </div>

                <div className="w-16 flex justify-end self-end md:hidden">
                    <Link to={"#"} className={"self-center"}>
                        <FiMenu size={40} onClick={() => setisMenuopen(true)} />
                    </Link>
                </div>

                <nav className="content-center justify-center hidden md:inline">


                    <ul className="md:flex flex-col gap-2 content-center align-middle self-center md:flex-row hidden mt-1">
                        <NavLink to="/" className="inline-block mx-3 hover:text-blue-600 transition-all">
                            <li>Home</li>
                        </NavLink>
                        <NavLink to={"/appointment"} className="inline-block hover:text-blue-600 transition-all">
                            <li>Appointment</li>
                        </NavLink>

                        <NavLink to={"/ourservices"} className="inline-block mx-3 hover:text-blue-600 transition-all">
                            <li>Our services</li>
                        </NavLink>
                        
                        <NavLink to={"/contact"} className="inline-block mx-3 hover:text-blue-600 transition-all">
                            <li>Contact us</li>
                        </NavLink>
                        <NavLink to={"/about"} className="inline-block mx-3 hover:text-blue-600 transition-all">
                            <li>About us</li>
                        </NavLink>

                        {
                            auth?.user?.role === 'admin' &&
                            <NavLink to={"/create-service"} className="inline-block mx-3 hover:text-blue-600 transition-all">
                                <li>Services</li>
                            </NavLink>
                        }

                        {
                            auth?.user?.role === 'admin' &&
                            <NavLink to={"/all-appointments"} className="inline-block mx-3 hover:text-blue-600 transition-all">
                                <li>Customers appointments</li>
                            </NavLink>
                        }
                    </ul>
                </nav>

                <div className=" justify-self-end self-center hidden sm:inline">
                    {
                        !auth?.user ?
                            (
                                <div className="hidden sm:inline">
                                    <NavLink to={"/login"} className="mr-2 hover:text-blue-500">Log In</NavLink>
                                    <NavLink to={"/register"} className="ml-2 hover:text-blue-500">Register</NavLink>
                                </div>
                            ) :
                            (
                                <div className="hidden md:inline">
                                    <span >{auth.user.email} </span>
                                    <NavLink to={"/logout"} className="ml-2 hover:text-blue-500 hidden sm:inline ">
                                        <ImSwitch size={22} className='inline' />
                                    </NavLink>
                                </div>
                            )
                    }
                </div>

            </div>
        </header>
    )
}

export default HeaderSub;