import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    const { isAuth } = useSelector((s) => s.user)
    const navigates = useNavigate();
    return (
        <>
            <div className="w-full px-[60px] md:px-[150px] pt-[30px] flex justify-between items-center">
                <div className="flex">
                    <Link to="/">
                        <h1 className="text-primary font-bold">Zwallet</h1>
                    </Link>
                </div>
                <div className="hidden flex gap-3 md:flex">
                    {
                        isAuth == true ? (
                            <div className="w-[85px] h-[20px] border-2 border-primary bg-primary rounded-lg p-4 flex items-center justify-center">
                                <button onClick={() => navigates('/home')} className="text-xs font-bold text-white">Home</button>
                            </div>
                        ) : (
                            <>
                                <div className="w-[85px] h-[20px] border-2 border-primary rounded-lg p-4 flex items-center justify-center">
                                    <button onClick={() => navigates('/sign-in')} className="text-xs font-bold text-primary">Login</button>
                                </div>
                                <div className="w-[85px] h-[20px] border-2 border-primary bg-primary rounded-lg p-4 flex items-center justify-center">
                                    <button onClick={() => navigates('/sign-up')} className="text-xs font-bold text-white">Sign Up</button>
                                </div>
                            </>
                        )
                    }
                </div>
                <div className="flex items-center justify-between md:hidden">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-24 md:w-32"
                        >
                            {
                                isAuth == true ? (
                                    <li>
                                        <Link to="/home" className="text-xs md:text-sm">Home</Link>
                                    </li>
                                ) : (
                                    <>
                                        <li>
                                            <Link to="/sign-up" className="text-xs md:text-sm">Login</Link>
                                        </li>
                                        <li>
                                            <Link to="/sign-up" className="text-xs md:text-sm">Sign up</Link>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Header;