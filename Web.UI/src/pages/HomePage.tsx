import { Skeleton } from "@mui/material";
import moment from "moment";
import React from "react";
import { createPosts } from "../api/assos.axios";
import { Avatar } from "../components/Avatar";
import { Layout } from "../components/Layout";
import { FilterWithChip, InputForPosts, Posts } from "../components/Posts";
import { getUsersActions } from "../utils/context/actions/admin";
import { useStoreContext } from "../utils/context/StoreContext";
import { getUserNameById } from "../utils/helpers/assist";
import MercureSubscriber from "../utils/helpers/hookCustom";

const HomePage = () => {

    const { dispatch, state: {
        user: { associations, firstname, lastname, id },
        admin: { userList, needRefreshAdmin },
        loader: { isLoading },
    } } = useStoreContext();

    const [pageNumber, setPageNumber] = React.useState(1);
    const [prevPageNumber, setPrevPageNumber] = React.useState(pageNumber);
    const [posts, setPosts] = React.useState({
        id: 0,
        content: "",
        owner: "",
        association: { id: 0 },
        createdAt: "",
        updatedAt: "",
        comments: [],
    });

    const [displayData, setDisplayData] = React.useState<any[]>([]);
    //const [selectedAssos, setSelectedAssos] = React.useState<number[]>([]);

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

    React.useEffect(() => {
        if (posts.owner !== '') setDisplayData([...displayData, {
            id: posts.id,
            content: posts.content,
            owner: posts.owner,
            association: posts.association,
            createdAt: posts.createdAt,
            updatedAt: posts.updatedAt,
            comments: posts.comments
        }])
    }, [posts])

    console.log('displayData', displayData);

    return (
        <div className="w-full h-full flex">
            <Layout large>
                <InputForPosts
                    sender={<Avatar initial={firstname + ' ' + lastname} displayName />}
                    action={createPosts}
                    assodId={1}
                    userId={id}
                    assos={assos}
                />
                <FilterWithChip options={associations} />
                <div className="mt-5 overflow-scroll h-5/6" onScroll={(e) => handleScroll(e)}>
                    {
                        <MercureSubscriber
                            topics={['http://localhost:3000/api/posts/{id}']}
                            update={setPosts}
                            hub={'http://localhost:8000/.well-known/mercure'}
                            json
                        >
                            <div>
                                {displayData.map(post => {
                                    return (
                                        <Posts
                                            key={post.id}
                                            idPost={post.id}
                                            content={post.content}
                                            sender={<Avatar initial={getUserNameById(post.owner.id, userList)} subInfo={moment(post.createdAt).format('llll')} displayName />}
                                            idAssos={post.association.id}
                                        />
                                    )
                                })}
                            </div>
                        </MercureSubscriber>
                    }
                </div>
            </Layout>
        </div>
    )
}

export default HomePage

// postsList.map((post: PostsAssosState) => {
                        //     return (
                        //         <Posts
                        //             content={post.content}
                        //             sender={<Avatar initial={getUserNameById(post.owner.id, userList)} subInfo={moment(post.createdAt).format('llll')} displayName />}
                        //             comments={commentsfromapi}
                        //             idPost={post.id}
                        //             idAssos={post.association.id}
                        //         />
                        //     )
                        // })