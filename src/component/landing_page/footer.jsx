import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
        <div className="bg-primary w-full px-[60px] py-[30px] md:px-[150px] md:py-[80px] mt-5 flex flex-col justify-between text-white">
            <div className="flex flex-col">
                <h1 className="font-bold text-[20px]">Zwallet</h1>
                <p className="text-[9px] md:text-xs">Simplify financial needs and saving much time in banking needs with one single app.</p>
            </div>
            <div className="flex hairline border border-b-indigo-50 border-1 w-full my-5"></div>
            <div className="flex flex-col-reverse items-center gap-2 md:flex-row justify-between text-xs w-full">
                <div className="flex">
                © 2020 Zwallet. All right reserved.
                </div>
                <div className="flex gap-5">
                    <div>+62 5637 8882 9901</div>
                    <div>contact@zwallet.com</div>
                </div>
            </div>
        </div>
        </>
    )

}

export default Footer;