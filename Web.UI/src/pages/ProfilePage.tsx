import { Layout } from "../components/Layout";
import { AssosState } from "../utils/context/reducers/assos";
import { MyAssosState, userIS } from "../utils/context/reducers/user";
import { useStoreContext } from "../utils/context/StoreContext";

const LayoutAssos = () => {
    const { state: { user: {
        associations
    } } } = useStoreContext();
    return (
  <div>
    <h2 className="font-bold underline">Mes associations</h2>
    <div className="flex flex-col mt-1">
        {associations.map((asso: MyAssosState) => {
            return <span>{asso.name}</span>
        })}
    </div>
  </div>
)
}



const ProfilePage = () => {
    const { state: { user: {
        firstname,
        lastname,
        username
    } } } = useStoreContext();
    return (
        <div className="w-full h-full flex">
            <Layout>
                <div className="h-56">
                    <div className="h-3/6 w-full shadow-2xl flex-col">
				        <div className="h-full">
					        <div className="w-full rounded drop-shadow-md bg-[url('./assets/img/bg-profile-big.jpeg')] h-full bg-no-repeat bg-center cursor-pointer z-10"></div>
				        </div>
				        <div className="left-0 -top-64 w-44 relative mt-52 ml-6">
					        <div className="w-32 h-32 shadow-2xl bg-[url('./assets/img/avatar.png')] bg-contain rounded-full object-cover p-1 cursor-pointer relative z-99"></div>
				        </div>
			        </div>
                </div>
                <div className="flex flex-col content-between space-y-16">
                    <div className="flex w-full h-18 flex-row justify-end">
                        <div className="w-5/6 flex justify-between">
                            <div className="w-52 h-10 ml-12 flex flex-col justify-center items-start">
                                <p className="flex justify-center items-center h-full text-white text-3xl">{username}</p>
                                <p className="text-white">{firstname + " " + lastname} </p>
                            </div>
                            <div className="w-44 bg-white rounded-lg shadow-xl flex flex-end mr-3">
                                <button className="flex justify-center items-center h-full w-full ">Edit Profile</button>
                            </div>
                        </div>
				    </div>
                    <div className="w-full h-full ƒ10 flex flex-row justify-center">
                        <div className="bg-gray-200 h-3/6 w-2/6 ml-3 mr-3 rounded-xl px-4 py-4 flex flex-col">
                            <h1 className='font-bold'>Intro</h1>
                            <LayoutAssos />
                        </div>
                    <div className="flex flex-col h-screen w-full mr-3 overflow-y-scroll">
                        {/* Ajouter mes posts*/}
                    </div>
			    </div>
                </div>
            </Layout>
        </div>
    );
}

export default ProfilePage;