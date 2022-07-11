import { Skeleton } from "@mui/material";
import moment from "moment";
import React from "react";
import { Avatar } from "../components/Avatar";
import { Layout } from "../components/Layout";
import { FilterWithChip, InputForPosts, Posts } from "../components/Posts";
import { getUsersActions } from "../utils/context/actions/admin";
import { getAllPostsFromAllAssosAction, getChildPostsAction, getPostsAction } from "../utils/context/actions/posts";
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

    React.useEffect(() => {
        if (needRefreshPosts && id !== 0 || pageNumber !== prevPageNumber) {
            getAllPostsFromAllAssosAction(dispatch, id, pageNumber);
            setStorePosts(storePosts => [...storePosts, ...postsList]);
        }
    }, [needRefreshPosts, id, pageNumber])

    const [storePosts, setStorePosts] = React.useState(postsList);

    React.useEffect(() => {
        if (needRefreshPosts) {
            postsList.map(post => {
                getChildPostsAction(dispatch, post.id)
            })
        }
    }, [needRefreshPosts])

    React.useEffect(() => {
        if (needRefreshAdmin) { getUsersActions(dispatch) }
    }, [needRefreshAdmin])

    const handleScroll = (event: any) => {
        event.target.scrollTop > event.target.scrollHeight - event.target.clientHeight && setPageNumber(pageNumber + 1)
        setPrevPageNumber(pageNumber)
    }

    return (
        <div className="w-full h-full flex">
            <Layout large>
                <InputForPosts
                    sender={<Avatar initial={firstname + ' ' + lastname} displayName />}
                    action={console.log}
                />
                <FilterWithChip options={associations} />
                <div className=" mt-5 overflow-scroll h-5/6" onScroll={(e) => handleScroll(e)}>
                    {isLoading ? (
                        <Skeleton
                            variant="rectangular"
                            width={'100%'}
                            height={'100%'}
                            style={{ borderRadius: '8px' }}
                        />
                    ) : (
                        storePosts.map((post, index) => {
                            if (post.parentPost === null) {
                                return (
                                    <Posts
                                        key={index}
                                        content={post.content}
                                        sender={<Avatar initial={getUserNameById(post.owner.id, userList)} subInfo={moment(post.createdAt).format('DD/MM/YYYY')} displayName />}
                                        childPosts={post.childPosts}
                                        idPost={post.id}
                                        idAssos={post.association.id}
                                    />
                                )
                            }
                        })
                    )}
                </div>
            </Layout>
        </div>
    )
}

export default HomePage