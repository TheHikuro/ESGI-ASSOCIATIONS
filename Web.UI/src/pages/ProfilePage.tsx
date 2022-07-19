import { Layout } from "../components/Layout";

const ProfilePage = () => {
    return (
        <div className="w-full h-full flex">
            <Layout>
                <h1 className="text-white text-2xl">Profile Page</h1>
                <div>
                    <div className="h-3/6 w-full shadow-2xl flex-col">
				        <div className="h-full">
					        <div className="w-full rounded drop-shadow-md bg-[url('./assets/img/bg-profile-big.jpeg')] h-full bg-no-repeat bg-center cursor-pointer z-10"></div>
				        </div>
				        <div className="left-0 -top-64 relative mt-52 ml-11 w-44">
					        <div className="w-44 h-44 shadow-2xl bg-[url('./assets/img/avatar.png')] bg-contain rounded-full object-cover p-1 cursor-pointer relative z-99"></div>
				        </div>
			        </div>
                </div>
                <div className="flex flex-col content-between space-y-16 pt-6">
                    <div className="flex w-full h-20 flex-row justify-end">
                        <div className="w-5/6 flex justify-between">
                            <div className="w-52 h-10 ml-12 flex flex-col justify-center items-start">
                                <p className="flex justify-center items-center h-full text-white text-3xl">Loan Cleris</p>
                                <p className="text-white">Nombre de participations : </p>
                            </div>
                            <div className="w-44 h-10 bg-white rounded-lg shadow-xl flex flex-end mr-3">
                                <button className="flex justify-center items-center h-full w-full ">Edit Profile</button>
                            </div>
                        </div>
				    </div>
                    <div className="w-full h-full mt-10 flex flex-row justify-center">
                        <div className="bg-gray-200 h-4/6 w-2/6 ml-3 mr-3 rounded-xl px-4 py-4 flex flex-col">
                            <h1 className='font-bold'>Intro</h1>
                        </div>

                    <div className="flex flex-col h-screen w-full mr-3 overflow-y-scroll">
                        <div className="bg-gray-200 h-52 w-6/6 rounded-xl mb-5 flex">
                            <div className="flex justify-center items-center w-1/3 h-full">
                                <div className="w-44 h-44 bg-[url('./assets/img/bg-login.jpeg')] bg-contain rounded-full z-99 "></div> 
                            </div>
                            <div className='flex mt-7 flex-col'>
                                <h2 className='font-bold text-3xl text-gray-600'>League of Legends</h2>
                                <div className='flex flex-col mt-4'>
                                    <div>Rejoins depuis le :  </div>
                                    <div>participations: 3</div>
                                </div>
                            </div>
                        </div>
                    </div>
			    </div>
                </div>
            </Layout>
        </div>
    );
}

export default ProfilePage;