import React, { useEffect, useState } from "react";
import useApi from '../../helper/useApi';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom'


function LandingPage() {

    const api = useApi()

    const [user, setuser] = useState([]);
    const [product, setproduct] = useState([]);
    const [id_user, setid_user] = useState({});
    const [totalpay, settotalpay] = useState(0);

    const [message_success, setmessage_success] = useState("");
    const [message_error, setmessage_error] = useState("");

    const optionsuser = [];
    if (user) {
        user.map((v) =>
            optionsuser.push({ value: v.id_user, label: v.full_name })
        );
    }

    const users = async () => {
        try {
            const { data } = await api({
                method: 'get',
                url: 'user',
            })
            setuser(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const PRODUCTS = [
        {
            id: 1,
            name: "Beras",
            picture: "https://ipanganan.com/images/banner1a.png",
            price: 10000
        }, {
            id: 2,
            name: "Teh",
            picture: "https://cf.shopee.co.id/file/2c559cae36b8f0b9008a73cfe861927d",
            price: 9000
        }, {
            id: 3,
            name: "Gula",
            picture: "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/11/6/556a6450-25f6-41d2-8cc3-07f35d4989e7.jpg",
            price: 14000
        }, {
            id: 4,
            name: "Kopi",
            picture: "https://coffee.alexflipnote.dev/EN4h3JEGE3c_coffee.jpg",
            price: 8000
        }, {
            id: 5,
            name: "Telur",
            picture: "https://cdn-2.tstatic.net/batam/foto/bank/images/telur-ayam_20180416_112847.jpg",
            price: 12000
        }, {
            id: 6,
            name: "Jeruk",
            picture: "https://png.pngtree.com/png-clipart/20201208/original/pngtree-stack-cut-oranges-png-image_5529928.jpg",
            price: 18000
        }, {
            id: 7,
            name: "Apel",
            picture: "https://png.pngtree.com/png-clipart/20190614/original/pngtree-photo-realistic-of-red-apple-full-editable-isolated-on-white-png-image_3718196.jpg",
            price: 28000
        }
    ]

    const insert = async () => {
        try {
            const { data } = await api({
                method: 'POST',
                url: 'transaction',
                data: {
                    "id_user": id_user.value,
                    "total": totalpay
                }
            })
            setmessage_success(data.message)
        } catch (e) {
            setmessage_error(e.response.data.error)
        }
    }

    useEffect(() => {
        document.title = 'Cashier';
        users()
    }, [])

    const [menu, setmenu] = useState(false)

    const klik_menu = () => {
        setmenu(menu ? false : true)
    }

    const handleResize = () => {
        if (window.innerWidth > 768) {
            setmenu(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

    useEffect(() => {
        setTimeout(() => {
            setmessage_error('')
            setmessage_success('')
        }, 15000)
    }, [message_error, message_success]);

    return (
        <div className="">
            <div className='flex flex-col-reverse md:grid md:grid-cols-6 p-5 gap-y-5 md:gap-x-5'>
                <div className='md:grid md:col-start-1 md:col-span-4'>
                    <div className={(menu ? "hidden" : "block") + ' flex flex-wrap justify-between gap-y-10 gap-x-10'}>
                        {
                            PRODUCTS ? (
                                PRODUCTS.map((v) => {
                                    return (
                                        <div key={v.id} className="hover:cursor-pointer" onClick={() => {
                                            let count = 0
                                            product.map((val) => {
                                                if (val.id == v.id) {
                                                    count++
                                                }
                                            })
                                            if (count == 0) {
                                                setproduct([...product, {
                                                    id: v.id,
                                                    name: v.name,
                                                    picture: v.picture,
                                                    price: v.price,
                                                    count: 1
                                                }])
                                                settotalpay(totalpay + v.price)
                                            }
                                        }}>
                                            <div className='border border-gray-500 rounded-md p-4 max-h-fit w-28 text-center flex flex-col'>
                                                <div className="h-[80px] w-[80px]">
                                                    <img src={v.picture} alt='' className='h-full w-full object-cover rounded-md border' />
                                                </div>
                                                <p>{v.name}</p>
                                                <p className="text-sm">Rp. {v.price}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div>
                                    <h1>Data Not Found</h1>
                                </div>
                            )
                        }
                    </div>
                    <div className={(menu ? "block" : "hidden") + " flex flex-col gap-y-3"}>
                        {
                            product.length != 0 ? (
                                product.map((v, i) => {
                                    return (
                                        <div key={v.id} className="k">
                                            <div className='border border-gray-500 rounded-md p-2 h-26 text-center flex justify-between items-center'>
                                                <div className="flex gap-3">
                                                    <div className="h-16 w-16">
                                                        <img src={v.picture} alt='' className='h-full w-full object-cover rounded-md border' />
                                                    </div>
                                                    <div>
                                                        <p className="text-left mb-3">{v.name}</p>
                                                        <p className="text-sm text-left">Rp. {v.price}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-25">
                                                    <div className="text-right mb-5">
                                                        <button className="text-center text-sm h-5 w-5 border border-gray-500 rounded hover:bg-red-600" onClick={() => {
                                                            setproduct([...product.slice(0, i), ...product.slice(i + 1, product.length)])
                                                            settotalpay(totalpay - (v.count * v.price))
                                                        }}>X</button>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => {
                                                            if (v.count != 0) {
                                                                product[i].count = v.count - 1
                                                                setproduct([...product])
                                                                settotalpay(totalpay - v.price)
                                                            }
                                                        }} className="h-6 w-6 border border-gray-500 rounded hover:bg-red-600">-</button>
                                                        <a className="py-1 px-1 border border-gray-500 rounded mx-2 text-sm" >{v.count} </a>
                                                        <button onClick={() => {
                                                            product[i].count = v.count + 1
                                                            setproduct([...product])
                                                            settotalpay(totalpay + v.price)
                                                        }} className="h-6 w-6 border border-gray-500 rounded hover:bg-green-600">+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="">
                                    <h1>Nothing was ordered.</h1>
                                </div>
                            )
                        }
                    </div>
                    <div className={(menu ? "block" : "hidden") + " flex justify-between mt-10"}>
                        <p>Total</p>
                        <p className="font-bold">Rp. {totalpay}</p>
                    </div>

                    <div className="mt-10">
                        {
                            message_error != '' ? (
                                <div className="block md:hidden text-red-400 text-center tracking-wide mb-3 text-sm">{message_error}</div>
                            ) : ''
                        }
                        {
                            message_success != '' ? (
                                <div className="block md:hidden text-green-600 text-center tracking-wide mb-3 text-sm">{message_success}</div>
                            ) : ''
                        }
                        {
                            product.length != 0 ? (
                                <button onClick={insert} className={(product.length > 0 ? "hover:bg-blue-600" : "") + " block md:hidden h-12 border rounded-md font-bold w-full"}>Checkout</button>
                            ) : (
                                <button className={(product.length > 0 ? "hover:bg-blue-600" : "") + " block md:hidden h-12 border rounded-md font-bold w-full"} disabled>Checkout</button>
                            )
                        }</div>
                </div>
                <div className="md:grid md:col-start-5 md:col-span-6">
                    <div className='flex justify-between md:justify-normal flex-row md:flex-col gap-y-3'>
                        <div className="">
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                options={optionsuser}
                                onChange={setid_user}
                                name="color"
                                placeholder="Select users"
                            />
                        </div>
                        <div className="block md:hidden hover:cursor-pointer" onClick={klik_menu}>
                            {
                                menu ?
                                    (
                                        <i className="fa fa-times" aria-hidden="true"></i>
                                    ) : (
                                        <i className="fa fa-bars" aria-hidden="true"></i>
                                    )
                            }
                        </div>
                        {
                            product.length != 0 ? (
                                product.map((v, i) => {
                                    return (
                                        <div key={v.id} className="hidden md:block">
                                            <div className='border border-gray-500 rounded-md p-2 h-26 text-center flex justify-between items-center'>
                                                <div className="flex gap-3">
                                                    <div className="h-16 w-16">
                                                        <img src={v.picture} alt='' className='h-full w-full object-cover rounded-md border' />
                                                    </div>
                                                    <div>
                                                        <p className="text-left mb-3">{v.name}</p>
                                                        <p className="text-sm text-left">Rp. {v.price}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col w-25">
                                                    <div className="text-right mb-5">
                                                        <button className="text-center text-sm h-5 w-5 border border-gray-500 rounded hover:bg-red-600" onClick={() => {
                                                            setproduct([...product.slice(0, i), ...product.slice(i + 1, product.length)])
                                                            settotalpay(totalpay - (v.count * v.price))
                                                        }}>X</button>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => {
                                                            if (v.count != 0) {
                                                                product[i].count = v.count - 1
                                                                setproduct([...product])
                                                                settotalpay(totalpay - v.price)
                                                            }
                                                        }} className="h-6 w-6 border border-gray-500 rounded hover:bg-red-600">-</button>
                                                        <a className="py-1 px-1 border border-gray-500 rounded mx-2 text-sm" >{v.count} </a>
                                                        <button onClick={() => {
                                                            product[i].count = v.count + 1
                                                            setproduct([...product])
                                                            settotalpay(totalpay + v.price)
                                                        }} className="h-6 w-6 border border-gray-500 rounded hover:bg-green-600">+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="hidden md:block">
                                    <h1>Nothing was ordered.</h1>
                                </div>
                            )
                        }
                        <div className={"hidden md:block md:flex md:justify-between"}>
                            <p>Total</p>
                            <p className="font-bold">Rp. {totalpay}</p>
                        </div>
                        {
                            message_error != '' ? (
                                <div className="hidden md:block text-red-400 text-center tracking-wide mb-3 text-sm">{message_error}</div>
                            ) : ''
                        }
                        {
                            message_success != '' ? (
                                <div className="hidden md:block text-green-600 text-center tracking-wide mb-3 text-sm">{message_success}</div>
                            ) : ''
                        }
                        {
                            product.length != 0 ? (
                                <button onClick={insert} className={(product.length > 0 ? "hover:bg-blue-600" : "") + " hidden md:block h-12 border rounded-md font-bold"}>Checkout</button>
                            ) : (
                                <button className={(product.length > 0 ? "hover:bg-blue-600" : "") + " hidden md:block h-12 border rounded-md font-bold"} disabled>Checkout</button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div >
    )

}

export default LandingPage;