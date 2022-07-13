import { Skeleton } from "@mui/material";
import moment from "moment";
import React from "react";
import { Avatar } from "../components/Avatar";
import { Layout } from "../components/Layout";
import { FilterWithChip, InputForPosts, Posts } from "../components/Posts";
import { getUsersActions } from "../utils/context/actions/admin";
import { createPostsAction, getAllPostsFromAllAssosAction, getCommentsAction } from "../utils/context/actions/posts";
import { PostsAssosState } from "../utils/context/reducers/assos";
import { useStoreContext } from "../utils/context/StoreContext";
import { getUserNameById } from "../utils/helpers/assist";

const HomePage = () => {

    const { dispatch, state: {
        user: { associations, firstname, lastname, id },
        posts: { postsList, needRefreshPosts },
        admin: { userList, needRefreshAdmin },
        comments: { commentList, needRefreshComment },
        loader: { isLoading },
    } } = useStoreContext();

    const [pageNumber, setPageNumber] = React.useState(1);
    const [prevPageNumber, setPrevPageNumber] = React.useState(pageNumber);
    //const [selectedAssos, setSelectedAssos] = React.useState<number[]>([]);

    React.useEffect(() => {
        if (userList.length === 0 || pageNumber !== prevPageNumber) {
            getAllPostsFromAllAssosAction(dispatch, pageNumber);
            //setStorePosts(storePosts => [...storePosts, ...postsList]);
        }
    }, [needRefreshPosts, pageNumber])

    React.useEffect(() => {
        if (needRefreshComment) {
            getCommentsAction(dispatch)
        }
    }, [needRefreshComment])

    React.useEffect(() => {
        if (needRefreshAdmin) { getUsersActions(dispatch) }
    }, [needRefreshAdmin])

    const handleScroll = (event: any) => {
        event.target.scrollTop > event.target.scrollHeight - event.target.clientHeight && setPageNumber(pageNumber + 1)
        setPrevPageNumber(pageNumber)
    }

    const assos = associations.map(association => {
        return {
            id: association.id,
            name: association.name,
        }
    })

    const commentsfromapi = commentList.map((comment) => {
        return {
            id: comment.id,
            content: comment.content,
            owner: comment.owner,
            createdAt: comment.createdAt,
            post: comment.post
        }
    })

    console.table(postsList);

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
                <div className="mt-5 overflow-scroll h-5/6" onScroll={(e) => handleScroll(e)}>
                    {
                        postsList.map((post: PostsAssosState) => {
                            return (
                                <Posts
                                    content={post.content}
                                    sender={<Avatar initial={getUserNameById(post.owner.id, userList)} subInfo={moment(post.createdAt).format('llll')} displayName />}
                                    comments={commentsfromapi}
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