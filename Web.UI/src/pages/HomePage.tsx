import React from "react";
import { Layout } from "../components/Layout";
import { getPostsByAssosActions } from "../utils/context/actions/assos";
import { AssosDetails, PostsState } from "../utils/context/reducers/assos";
import { useStoreContext } from "../utils/context/StoreContext";
import { useMercureState } from "../utils/helpers/mercure";

const HomePage = () => {
    const { dispatch, state: { assos: { assosList, needRefresh } } } = useStoreContext();

    React.useEffect(() => {
        if (needRefresh) {
            getPostsByAssosActions(dispatch, 1)
        }
    }, [needRefresh]);

    const posts = useMercureState([]);

    return (
        <div className="w-full h-full flex">
            <Layout>
                <h1 className="text-xl">HomePage</h1>
                {posts.map((post: PostsState) => {
                    return (
                        <div className="flex flex-col">
                            <p>{post.content}</p>
                        </div>
                    )
                })}
            </Layout>
        </div>
    )
}

export default HomePage