import { Skeleton } from "@mui/material";
import moment from "moment";
import React from "react";
import { Avatar } from "../components/Avatar";
import { Layout } from "../components/Layout";
import { FilterCheckbox, InputForPosts, Posts } from "../components/Posts";
import { getUsersActions } from "../utils/context/actions/admin";
import { getChildPostsAction, getPostsAction } from "../utils/context/actions/posts";
import { useStoreContext } from "../utils/context/StoreContext";
import { getUserNameById } from "../utils/helpers/assist";

const HomePage = () => {

    const { dispatch, state: {
        user: { associations, firstname, lastname },
        posts: { postsList, needRefreshPosts },
        admin: { userList, needRefreshAdmin },
        loader: { isLoading },
    } } = useStoreContext();

    React.useEffect(() => {
        if (needRefreshPosts) { getPostsAction(dispatch, 1) }
    }, [needRefreshPosts])

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

    return (
        <div className="w-full h-full flex">
            <Layout large>
                <InputForPosts
                    sender={<Avatar initial={firstname + ' ' + lastname} />}
                    action={console.log}
                />
                <FilterCheckbox options={associations} />
                <div className="px-32 mt-10 overflow-scroll h-5/6">
                    {isLoading ? (
                        <Skeleton
                            variant="rectangular"
                            width={'100%'}
                            height={'100%'}
                            style={{ borderRadius: '8px' }}
                        />
                    ) : (
                        postsList.map((post, index) => {
                            if (post.parentPost === null) {
                                return (
                                    <Posts
                                        key={index}
                                        content={post.content}
                                        sender={<Avatar initial={getUserNameById(post.owner.id, userList)} subInfo={moment(post.createdAt).format('DD/MM/YYYY')} />}
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