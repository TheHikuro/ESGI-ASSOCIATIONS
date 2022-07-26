import moment from "moment";
import React, { Fragment } from "react";
import { getMyPosts } from "../api/assos.axios";
import { Avatar, BigAvatar } from "../components/Avatar";
import { FormComponents } from "../components/FormData";
import { Layout } from "../components/Layout";
import { useModalContext } from "../components/modal";
import { Posts } from "../components/Posts";
import { getAllSections } from "../utils/context/actions/section";
import { updateUserActions } from "../utils/context/actions/user";
import { PostsAssosState } from "../utils/context/reducers/assos";
import { MyAssosState } from "../utils/context/reducers/user";
import { useStoreContext } from "../utils/context/StoreContext";
import LogoDiscord from "../assets/img/logo-discord.svg";
import { linkToDiscord, unLinkDiscord } from "../api/users.axios.api";
import { useNavigate } from "react-router-dom";

const LayoutAssos = () => {
    const { state: { user: {
        associations
    } } } = useStoreContext();
    return (
        <div>
            <h2 className="font-bold underline">Mes associations</h2>
            <div className="flex flex-col mt-1">
                {associations.map((asso: MyAssosState) => {
                    return <span>{asso.name}</span>
                })}
            </div>
        </div>
    )
}

const ProfilePage = () => {
    const { dispatch, state: {
        user: { id, firstname, lastname, username, section: mySection, discordUserId },
        section: { sectionList, needRefreshSection }
    } } = useStoreContext();
    const { openModal, updateModalContent, updateModalTitle } = useModalContext();
    const [MyPosts, setMyPosts] = React.useState<any[]>([]);
    const navigate = useNavigate()

    React.useEffect(() => {
        if (needRefreshSection) getAllSections(dispatch)
    }, [needRefreshSection]);

    React.useEffect(() => {
        getMyPosts(id).then(res => {
            setMyPosts(res);
        })
    }, [id, MyPosts.length]);

    const handleEditModal = () => {
        updateModalTitle("Modifier mon profil");
        updateModalContent(
            <Fragment>
                <FormComponents
                    values={[
                        { formControlName: "firstname", defaultValue: firstname },
                        { formControlName: "lastname", defaultValue: lastname },
                        { formControlName: "username", defaultValue: username },
                        {
                            formControlName: 'section', options: sectionList?.map((section: { id: number; name: string; }) => {
                                return {
                                    value: `/api/sections/${section.id}`,
                                    label: section.name
                                }
                            }
                            ), dropdown: true, defaultValue: `api/sections/${mySection.id}`
                        },
                    ]}
                    title="Modifier mon profil"
                    submitButtonText="Modifier"
                    id={id}
                    action={updateUserActions}
                />
            </Fragment>
        )
        openModal();
    }

    const getUrlCodeDicord = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (!code) {
            return null
        }
        return code;
    }

    React.useEffect(() => {
        const code = getUrlCodeDicord();
        const URI = `${import.meta.env.VITE_HOST_URL}/Profile`
        if (code !== null) {
            const data = {
                code: code,
                redirectURI: URI
            }
            linkToDiscord(data)
            navigate('/Profile')
        }
    }, [window.location])

    const revockLinkDiscord = () => {
        unLinkDiscord()
        window.location.reload()
    }

    return (
        <div className="w-full h-full flex">
            <Layout large>
                <div className="h-56">
                    <div className="h-72 w-full shadow-2xl flex-col">
                        <div className="h-full">
                            <div className="w-full rounded drop-shadow-md bg-[url('./assets/img/bg-profile-big.jpeg')] h-full bg-no-repeat bg-center cursor-pointer z-10"></div>
                        </div>
                        <div className="left-0 -top-64 w-44 relative mt-52 ml-3">
                            <BigAvatar initial={firstname + ' ' + lastname} large />
                        </div>
                    </div>
                    <div className="flex w-full justify-end mt-5 ml-4">
                        <div className=" flex justify-between w-11/12">
                            <div className="w-96 h-10 ml-12 flex flex-col justify-center">
                                <div className="flex items-start justify-start w-full">
                                    <div className="flex flex-col justify-start w-full">
                                        <p className="flex text-center items-center h-full text-white text-3xl">{username}</p>
                                        <p className="text-white">{firstname + " " + lastname} </p>
                                    </div>
                                    {discordUserId === null ? (
                                        <a href={encodeURI(`https://discord.com/api/oauth2/authorize?client_id=997589616276283475&redirect_uri=${import.meta.env.VITE_HOST_URL}/Profile&response_type=code&scope=identify`)}>
                                            <div className="mt-2 hover:cursor-pointer hover:shadow-xl -ml-32 p-1 w-64 h-12 rounded-md bg-blue-600 shadow-lg flex justify-center items-center">
                                                <img src={LogoDiscord} alt="Logo Discord" className="h-7 w-7 hover:cursor-pointer" />
                                                <span className="text-start ml-3 text-sm text-white font-bold">Lier mon compte Discord</span>
                                            </div>
                                        </a>
                                    ) : (
                                        <div className="mt-2 hover:cursor-pointer hover:shadow-xl -ml-32 p-1 w-96 h-12 rounded-md bg-red-400 shadow-lg flex justify-center items-center" onClick={revockLinkDiscord}>
                                            <img src={LogoDiscord} alt="Logo Discord" className="h-7 w-7 hover:cursor-pointer" />
                                            <span className="text-start ml-3 text-sm text-white font-bold">Delier mon compte Discord</span>
                                        </div>

                                    )}
                                </div>
                            </div>
                            <div className="w-44 bg-white rounded-lg shadow-lg hover:shadow-xl flex flex-end mr-4">
                                <div className="flex justify-center items-center h-full w-full hover:cursor-pointer" onClick={handleEditModal}>
                                    Edit Profile
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col content-between mt-48 ">
                    <div className="w-full h-full flex justify-center px-3">
                        <div className="bg-white w-64 h-96 mr-3 rounded-xl px-4 py-4 flex flex-col">
                            <LayoutAssos />
                        </div>
                        <div className="h-full w-full overflow-scroll -mt-3">
                            {MyPosts.map((post: PostsAssosState) => {
                                return (
                                    <Posts
                                        key={post.id}
                                        idPost={post.id}
                                        content={post.content}
                                        sender={<Avatar initial={post.owner.firstname + ' ' + post.owner.lastname} subInfo={moment(post.createdAt).format('llll')} displayName />}
                                        assosName={post.association.name}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default ProfilePage;