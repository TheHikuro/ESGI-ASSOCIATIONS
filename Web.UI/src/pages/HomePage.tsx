import moment from "moment";
import React from "react";
import { Layout } from "../components/Layout";
import Navbar from "../components/Navbar";
import { FilterCheckbox, InputForPosts, Posts } from "../components/Posts";
import { getAllAssosActions } from "../utils/context/actions/assos";
import { useStoreContext } from "../utils/context/StoreContext";
import { useMercureState } from "../utils/helpers/mercure";

const HomePage = () => {

    const { dispatch, state: {
        user: { associations, firstname, lastname },
        assos: { assosList, needRefreshAssos }
    } } = useStoreContext();

    React.useEffect(() => {
        if (needRefreshAssos) { getAllAssosActions(dispatch) }
    }, [needRefreshAssos]);

    const assosfromapi = assosList.map(assos => {
        return {
            id: assos.id,
            name: assos.name,
            description: assos.description,
            createdAt: assos.createdAt,
            posts: assos.posts,
            members: assos.members,
        }
    })


    return (
        <div className="w-full h-full flex">
            <Layout>
                <InputForPosts sender={<span>{firstname + ' ' + lastname}</span>} content={''} action={() => console.log('value')} />
                <FilterCheckbox options={associations} />
                <div className="px-32 mt-12">
                    <Posts content="test" childPosts={[<span>child1</span>, <h1>child 2</h1>]} sender={<span>{firstname + ' ' + lastname}</span>} createdAt={moment(new Date()).format('DD/MM/YYYY')} />
                </div>
            </Layout>
        </div>
    )
}

export default HomePage