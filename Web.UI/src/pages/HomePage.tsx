import { Skeleton } from "@mui/material";
import moment from "moment";
import React from "react";
import { createPosts, getAllPostsFromAllAssos } from "../api/assos.axios";
import { Avatar } from "../components/Avatar";
import { Layout } from "../components/Layout";
import { InputForPosts, Posts } from "../components/Posts";
import { useStoreContext } from "../utils/context/StoreContext";
import { MercureSubscriber } from "../utils/helpers/hookCustom";

const HomePage = () => {

    const { state: {
        user: { associations, firstname, lastname, id },
    } } = useStoreContext();

    const [pageNumber, setPageNumber] = React.useState(1);
    const [prevPageNumber, setPrevPageNumber] = React.useState(pageNumber);
    const [posts, setPosts] = React.useState({
        id: 0,
        content: "",
        owner: { id: 0, firstname: "", lastname: "" },
        association: { id: 0, name: '' },
        createdAt: "",
        updatedAt: "",
        comments: [],
    })

    const [displayData, setDisplayData] = React.useState<any[]>([]);
    React.useEffect(() => {
        if (displayData.length === 0 || prevPageNumber !== pageNumber) {
            getAllPostsFromAllAssos(pageNumber).then(res => {
                setDisplayData(res);
            }
            ).catch(err => {
                console.log(err);
            }
            );
        }
    }, [pageNumber]);

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
        if (posts.owner.firstname !== '') setDisplayData([...displayData, {
            id: posts.id,
            content: posts.content,
            owner: posts.owner,
            association: posts.association,
            createdAt: posts.createdAt,
            updatedAt: posts.updatedAt,
            comments: posts.comments,
        }])
    }, [posts])

    return (
        <div className="w-full h-full flex">
            <Layout large>
                <InputForPosts
                    sender={<Avatar initial={firstname + ' ' + lastname} displayName />}
                    action={createPosts}
                    userId={id}
                    assos={assos}
                />
                <div className="mt-5 overflow-scroll h-5/6" onScroll={(e) => handleScroll(e)}>
                    {
                        <MercureSubscriber
                            topics={[`${import.meta.env.VITE_API_HOST_URL}/api/posts/{id}`]}
                            update={setPosts}
                            hub={`${import.meta.env.VITE_HOST_URL}/.well-known/mercure`}
                            json
                        >
                            {displayData.filter(post => {
                                return associations.find(association => association.id === post.association.id)
                            }).sort((a, b) => {
                                return moment(b.createdAt).unix() - moment(a.createdAt).unix()
                            }).map(post => {
                                return (
                                    <Posts
                                        key={post.id}
                                        idPost={post.id}
                                        content={post.content}
                                        sender={<Avatar initial={post.owner.firstname + ' ' + post.owner.lastname} subInfo={moment(post.createdAt).format('llll')} displayName />}
                                        assosName={post.association.name}
                                        com={post.comments}
                                    />
                                )
                            })}
                        </MercureSubscriber>
                    }
                </div>
            </Layout>
        </div>
    )
}

export default HomePage