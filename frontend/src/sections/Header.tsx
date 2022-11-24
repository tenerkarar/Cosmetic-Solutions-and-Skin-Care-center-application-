import React, { useContext, useState } from "react";
import { FaAppStore, FaPlaystation, FaGlobeAmericas, FaPlusCircle, FaMemory, FaFemale } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

import { Link, Navigate, NavLink } from "react-router-dom";
import Button from "../components/Button";

import AuthContext from '../contexts/AuthContext';
import { ImSwitch } from "react-icons/im";

const Header = () => {

    //@ts-ignore
    const { auth, setAuth } = useContext(AuthContext);
    const [isMenuOpen, setisMenuopen] = useState <boolean> (false);

    const logout = () => {
        localStorage.removeItem('token');
        setAuth(null);
    }

    return (
        <header id="header" className="flex flex-col bg-black bg-haircut bg-center bg-cover h-96 text-slate-300">

            {/* menu responsive */}

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
            
            {/* #responsive menu */}
            
            {/* upper part and Menu */}
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
            {/* end upper part Menu */}
            <div className="flex flex-col place-items-center justify-center my-auto">
                <h1 className="text-5xl text-center md:text-7xl text-transparent mb-12 font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text">
                Skin Care Center
                </h1>

                <Link to={"/appointment/"} >
                    <Button title="Set an appointment" />
                </Link>

            </div>

        </header>
    );
};

export default Header;
