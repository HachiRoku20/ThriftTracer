import { useGetUserDataQuery } from "../store/store.jsx";

const Home = () => {

    const { data } = useGetUserDataQuery();
    console.log(data)


    return (
        <div className="container mx-auto text-slate-100 max-w-screen-xl">

            <div className="bg-gray-800 mx-4 rounded-md py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 font-bold">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">

                        <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7">Available Balance</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight sm:text-5xl">
                                ₱{data?.availableBalance}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

        </div>





    )
}

export default Home;