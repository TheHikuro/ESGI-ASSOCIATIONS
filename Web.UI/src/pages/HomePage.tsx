import { Layout } from "../components/Layout";
import Navbar from "../components/Navbar";
import { useStoreContext } from "../utils/context/StoreContext";
import { useMercureState } from "../utils/helpers/mercure";

const HomePage = () => {
    const posts = useMercureState([])
    return (
        <div className="w-full h-full flex">
            <Layout>
                <h1 className="text-xl">HomePage</h1>
            </Layout>
        </div>
    )
}

export default HomePage