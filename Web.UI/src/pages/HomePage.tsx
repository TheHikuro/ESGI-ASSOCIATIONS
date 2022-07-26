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
        if (displayData.length === 0 || pageNumber <= displayData.length) {
            getAllPostsFromAllAssos(pageNumber).then(res => {
                setDisplayData(res);
            }
            ).catch(err => {
                console.log(err);
            }
            );
        }
    }, [pageNumber]);

    const handleNextPage = () => {
        setPageNumber(pageNumber + 1)
        console.log("Next page", pageNumber);
    }

    const handlePrevPage = () => {
        setPageNumber(pageNumber - 1)
        console.log("Prev page", pageNumber);
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
                <div className="mt-5 overflow-scroll h-5/6">
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
                    <div className="flex justify-center w-full items-center mt-10">
                        <button
                            type="button"
                            className={`p-2 rounded-md shadow-md bg-transparent border border-blue-500 w-fit mr-5 hover:bg-slate-100 text-white hover:text-black ${displayData.length === 0 || pageNumber === 1 ? 'cursor-not-allowed' : ''}`}
                            onClick={handlePrevPage}
                            disabled={displayData.length === 0 || pageNumber === 1}
                        >
                            PrevPage
                        </button >
                        <button
                            type="button"
                            className={`p-2 rounded-md shadow-md bg-transparent border border-blue-500 w-fit hover:bg-slate-100 text-white hover:text-black ${displayData.length === 0 || pageNumber >= displayData.length ? 'cursor-not-allowed' : ''}`}
                            onClick={handleNextPage}
                            disabled={displayData.length === 0 || pageNumber >= displayData.length}
                        >
                            NextPage
                        </button >
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default HomePage