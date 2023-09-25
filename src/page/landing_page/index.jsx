import React, { useEffect, useRef } from "react";
import Header from "../../component/landing_page/header";
import Footer from "../../component/landing_page/footer";
import { Link, useNavigate } from "react-router-dom";
import Cards from "../../component/landing_page/cards";
import TestimonialSlider from "../../component/landing_page/testimonial";
import user from "../../store/reducer/user";
import useApi from '../../helper/useApi'


function LandingPage() {

    const api = useApi()
    const users = async () => {
        try {
            const { data } = await api({
                method: 'get',
                url: 'user',
            })
            console.log(data)
        } catch (error) {
            console.log(error)
            // setsuccess_message('')
            // seterror_message(error.response.data.message)
        }
    }
    // Testimonial
    const testimonials = [
        {
            image: "https://res.cloudinary.com/dpn40glt3/image/upload/v1688618676/app_tickitz/img/149071_cs5sff.png",
            name: "Julian Mindria",
            profession: "Fullstack Developer",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            image: "https://res.cloudinary.com/dpn40glt3/image/upload/v1688618676/app_tickitz/img/149071_cs5sff.png",
            name: "Eka Septian Shaputra",
            profession: "Fullstack Developer",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            image: "https://res.cloudinary.com/dpn40glt3/image/upload/v1688618676/app_tickitz/img/149071_cs5sff.png",
            name: "Verdi Sasmeka",
            profession: "Fullstack Developer",
            message: "“This is the most outstanding app that I’ve ever try in my live, this app is such an amazing masterpiece and it’s suitable for you who is bussy with their bussiness and must transfer money to another person aut there. Just try this app and see the power!”",
        },
        {
            image: "https://res.cloudinary.com/dpn40glt3/image/upload/v1688618676/app_tickitz/img/149071_cs5sff.png",
            name: "Adivigo Khalishtama",
            profession: "Fullstack Developer",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
    ];

    useEffect(() => {
        document.title = 'Zwallet';
        users()
    }, [])

    return (
        <>
            <Header />
            <div>
                {/* Hero Section Start */}
                <div className="w-full px-[60px] md:px-[150px] pt-[30px] flex flex-col md:flex-row items-center md:justify-center gap-8">
                    <div className="w-52 md:w-72">
                        <img src="https://res.cloudinary.com/dpn40glt3/image/upload/v1689703055/app-tictac/aqqnf4dxlyydaywdasuz.svg" alt="hero-img" />
                    </div>
                    <div className="w-96">
                        <h1 className="text-center md:text-left font-bold text-[18px] md:text-[25px] lg:text-[40px]">Awesome App For Saving <span className="text-[18px] font-bold md:text-[25px] lg:text-[40px] text-primary">Time.</span></h1>
                        <p className="text-center md:text-left text-[9px] md:text-[10px] lg:text-md text-gray-500 py-2">
                            We bring you a mobile app for banking problems that
                            oftenly wasting much of your times.
                        </p>
                        <div className="flex flex-row-reverse justify-between items-center md:items-start md:flex-col">
                            <div className="flex items-center justify-center bg-primary rounded-lg w-20 md:w-20 lg:w-32 p-2 my-5">
                                <button className="text-[10px] md:text-[9px] lg:text-xs text-white">Try It Free</button>
                            </div>
                            <div className="flex flex-col text-[10px] md:text-xs lg:text-sm">
                                Available on
                                <div className="flex md:gap-2 lg:gap-3 py-2 items-center w-14 md:w-16 lg:w-20">
                                    <Link to="#">
                                        <img src="https://res.cloudinary.com/dpn40glt3/image/upload/v1689704416/app-tictac/gplay_fydzxz.svg" alt="Playstore" />
                                    </Link>
                                    <Link to="#">
                                        <img src="https://res.cloudinary.com/dpn40glt3/image/upload/v1689704422/app-tictac/appstore_z8v8kr.svg" alt="Appstore" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Hero Section End */}
                {/* Section Logo Our Client Start */}
                <div className="bg-gray-100 w-full px-[60px] md:px-[150px] py-[30px] overflow-x-hidden flex justify-center">
                    <div className="flex  w-full items-center">
                        <div className="flex items-center justify-center w-full">
                            <img className="w-[50px] md:w-[80px]" src="https://res.cloudinary.com/dpn40glt3/image/upload/v1689773115/app-tictac/microsoft_pmmquf.svg" alt="microsoft" />
                            <img className="w-[50px] md:w-[80px]" src="https://res.cloudinary.com/dpn40glt3/image/upload/v1689773115/app-tictac/dropbox_i2ut0q.svg" alt="dropbox" />
                            <img className="w-[50px] md:w-[80px]" src="https://res.cloudinary.com/dpn40glt3/image/upload/v1689773115/app-tictac/h_m_tz3opt.svg" alt="h&m" />
                            <img className="w-[50px] md:w-[80px]" src="https://res.cloudinary.com/dpn40glt3/image/upload/v1689773115/app-tictac/airbnb_ffi0zb.svg" alt="airbnb" />
                            <img className="w-[50px] md:w-[80px]" src="https://res.cloudinary.com/dpn40glt3/image/upload/v1689773114/app-tictac/canon_kdtjgb.svg" alt="canon" />
                            <img className="w-[50px] md:w-[80px]" src="https://res.cloudinary.com/dpn40glt3/image/upload/v1689773114/app-tictac/dell_b2yjp1.svg" alt="dell" />
                        </div>
                    </div>
                </div>
                {/* Section Logo Our Client End */}
                {/* Section About Aplication Start */}
                <div className="w-full px-[60px] md:px-[150px] py-[30px] flex flex-col justify-center">
                    <div className="flex flex-col items-center">
                        <h1 className="text-center md:text-left font-bold text-[18px] md:text-[25px] lg:text-[40px] text-primary">About <span className="text-[18px] font-bold md:text-[25px] lg:text-[40px] text-black">the Application.</span></h1>
                        <p className="text-center md:text-left text-[9px] md:text-[10px] lg:text-md text-gray-500 py-2">
                            We have some great features from the application and it’s totally free to use by all users around the world.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row my-10 gap-5 justify-center">
                        <Cards
                            image="https://res.cloudinary.com/dpn40glt3/image/upload/v1689785379/app-tictac/phone_ezcvzm.svg"
                            title="24/7 Support"
                            desc="We have 24/7 contact support so you can contact us whenever you want and we will respond it."
                        />
                        <Cards
                            image="https://res.cloudinary.com/dpn40glt3/image/upload/v1689785380/app-tictac/lock_jzklzy.svg"
                            title="Data Privacy"
                            desc="We make sure your data is safe in our database and we will encrypt any data you submitted to us."
                        />
                        <Cards
                            image="https://res.cloudinary.com/dpn40glt3/image/upload/v1689785382/app-tictac/download_vi9z1s.svg"
                            title="Easy Download"
                            desc="Zwallet is 100% totally free to use it’s now available on Google Play Store and App Store."
                        />
                    </div>
                </div>
                {/* Section About Aplication End */}
                {/* Section Feature Aplication Start */}
                <div className="bg-gray-100 w-full px-[60px] md:px-[150px] py-[30px] flex flex-col md:flex-row items-center justify-center gap-10">
                    <div className="w-52 md:w-72">
                        <img src="https://res.cloudinary.com/dpn40glt3/image/upload/v1689703055/app-tictac/aqqnf4dxlyydaywdasuz.svg" alt="hero-img" />
                    </div>
                    <div className="w-96">
                        <h1 className="text-center md:text-left font-bold text-[18px] md:text-[25px] lg:text-[40px]">All The
                            <span className="text-[18px] font-bold md:text-[25px] lg:text-[40px] text-primary"> Great </span>
                            Zwallet Features.</h1>
                        <div className="flex flex-col gap-4 mt-5 mb-10">
                            <div className="bg-white rounded-lg p-3 md:p-3 lg:p-5 w-full">
                                <h1 className="text-xs md:text-xs lg:text-sm font-bold text-primary mb-3">1. <span className="text-black">Small Fee</span></h1>
                                <p className="text-[9px] md:text-[9px] lg:text-[11px] text-gray-400">We only charge 5% of every success transaction done in Zwallet app.</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 md:p-3 lg:p-5 w-full">
                                <h1 className="text-xs md:text-xs lg:text-sm font-bold text-primary mb-3">2. <span className="text-black">Data Secured</span></h1>
                                <p className="text-[9px] md:text-[9px] lg:text-[11px] text-gray-400">All your data is secured properly in our system and it’s encrypted.</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 md:p-3 lg:p-5 w-full">
                                <h1 className="text-xs md:text-xs lg:text-sm font-bold text-primary mb-3">3. <span className="text-black">User Family</span></h1>
                                <p className="text-[9px] md:text-[9px] lg:text-[11px] text-gray-400">Zwallet come up with modern and sleek design and not complicated.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Section Feature Aplication End */}
                {/* Sectin Overview Start */}
                <div className="w-full px-[60px] md:px-[150px] py-[30px] flex flex-col justify-center">
                    <div className="flex flex-col items-center">
                        <h1 className="text-center md:text-left font-bold text-[18px] md:text-[25px] lg:text-[40px]">What Users are <span className="text-[18px] font-bold md:text-[25px] lg:text-[40px] text-primary">Saying.</span></h1>
                        <p className="text-center md:text-left text-[9px] md:text-[10px] lg:text-md text-gray-500 py-2">
                            We have some great features from the application and it’s totally free to use by all users around the world.
                        </p>
                    </div>
                    <div className="flex justify-center items-center px-4 py-8">
                        <TestimonialSlider testimonials={testimonials} />
                    </div>
                </div>

                {/* Section Overview End */}
            </div>
            <Footer />
        </>
    )

}

export default LandingPage;