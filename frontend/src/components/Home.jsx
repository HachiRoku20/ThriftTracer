import { useGetUserDataQuery } from "../store/store.jsx";
import AccountCard from "./utils/AccountCard.jsx";
import AccountForm from "./Modals/AccountForm.jsx";
import { useState, useEffect, useCallback } from "react";



const Home = () => {

    const { data } = useGetUserDataQuery();
    const [openModal, setOpenModal] = useState(false);


    let formatter = Intl.NumberFormat('en', { notation: 'compact' });

    const modalHandler = useCallback(() => {
        setOpenModal(prevState => !prevState)
    }, [openModal])

    const closeModalHandler = useCallback(() => {
        setOpenModal(prevState => !prevState)
    }, [openModal])

    useEffect(() => {
        console.log(openModal)

    }, [openModal])



    return (
        <div className="container mx-auto text-slate-100 max-w-screen-xl">

            <div className="bg-gray-800 mx-4 rounded-md py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 font-bold">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">

                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7">Available Balance</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl">
                                ₱{formatter.format(data?.availableBalance)}
                            </dd>
                        </div>


                    </dl>
                </div>
            </div>

            <div className="bg-gray-800 mx-4 rounded-md py-6 sm:py-12 mt-2">
                <h2 className="p-4 font-bold text-lg">ACCOUNTS: </h2>

                <div className="mx-auto max-w-7xl px-6 lg:px-8 font-bold">
                    <dl className="flex flex-row overflow-x-auto gap-4">


                        {data && data?.accounts?.map((accounts) => (
                            <AccountCard key={accounts?._id} accountTitle={accounts?.title} accountAmount={accounts?.amount} />
                        ))}

                        <button onClick={modalHandler} className="mx-auto flex min-w-[45%] md:min-w-[30%] flex-col gap-y-4 rounded-md border-2 border-gray-700 p-4 items-center">

                            <dt className="text-base leading-7">Add Account</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl">
                                +
                            </dd>

                        </button >


                    </dl>
                </div>


            </div>

            <AccountForm isOpen={openModal} onClose={closeModalHandler} />



        </div>




    )
}

export default Home;