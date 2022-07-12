import { Skeleton } from "@mui/material";
import moment from "moment";
import React from "react";
import { Avatar } from "../components/Avatar";
import { Layout } from "../components/Layout";
import { FilterWithChip, InputForPosts, Posts } from "../components/Posts";
import { getUsersActions } from "../utils/context/actions/admin";
import { createPostsAction, getAllPostsFromAllAssosAction, getChildPostsAction } from "../utils/context/actions/posts";
import { useStoreContext } from "../utils/context/StoreContext";
import { getUserNameById } from "../utils/helpers/assist";

const HomePage = () => {

    const { dispatch, state: {
        user: { associations, firstname, lastname, id },
        posts: { postsList, needRefreshPosts },
        admin: { userList, needRefreshAdmin },
        loader: { isLoading },
    } } = useStoreContext();

    const [pageNumber, setPageNumber] = React.useState(1);
    const [prevPageNumber, setPrevPageNumber] = React.useState(pageNumber);
    //const [selectedAssos, setSelectedAssos] = React.useState<number[]>([]);

    React.useEffect(() => {
        if (needRefreshPosts && id !== 0 || pageNumber !== prevPageNumber) {
            getAllPostsFromAllAssosAction(dispatch, id, pageNumber);
            //setStorePosts(storePosts => [...storePosts, ...postsList]);
        }
    }, [needRefreshPosts, id, pageNumber])

    // React.useEffect(() => {
    //     if (needRefreshPosts) {
    //         getChildPostsAction(dispatch, id);
    //     }
    // }, [needRefreshPosts])

    //const [storePosts, setStorePosts] = React.useState(postsList);

    React.useEffect(() => {
        if (needRefreshAdmin) { getUsersActions(dispatch) }
    }, [needRefreshAdmin])

    const handleScroll = (event: any) => {
        event.target.scrollTop > event.target.scrollHeight - event.target.clientHeight && setPageNumber(pageNumber + 1)
        setPrevPageNumber(pageNumber)
    }

    // map associations 
    const assos = associations.map(association => {
        return {
            id: association.id,
            name: association.name,
        }
    })

    return (
        <div className="w-full h-full flex">
            <Layout large>
                <InputForPosts
                    sender={<Avatar initial={firstname + ' ' + lastname} displayName />}
                    action={createPostsAction}
                    assodId={1}
                    userId={id}
                    assos={assos}
                />
                <FilterWithChip options={associations} />
                <div className=" mt-5 overflow-scroll h-5/6" onScroll={(e) => handleScroll(e)}>
                    {
                        postsList.map((post: any) => {
                            return (
                                <Posts
                                    content={post.content}
                                    sender={<Avatar initial={getUserNameById(post.owner.id, userList)} subInfo={moment(post.createdAt).format('llll')} displayName />}
                                    childPosts={post.childPosts}
                                    idPost={post.id}
                                    idAssos={post.association.id}
                                />
                            )
                        })
                    }
                </div>
            </Layout>
        </div>
    )
}

export default HomePage

// storePosts.sort((a, b) => {
//     return moment(b.createdAt).unix() - moment(a.createdAt).unix()
// }).map(post => (
//    .filter(post => !storePosts.some(p => p.id === post.id))
// ))