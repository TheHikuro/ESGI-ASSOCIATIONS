import { Chip } from "@mui/material";
import moment from "moment";
import React, { Fragment } from "react";
import { getAllAssosActions } from "../utils/context/actions/assos";
import { postChildPostsAction } from "../utils/context/actions/posts";
import { useStoreContext } from "../utils/context/StoreContext";
import { getNameById, getUserNameById } from "../utils/helpers/assist";
import { Avatar } from "./Avatar";
import { ButtonDropdown } from "./Button";

interface InputPostProps {
    sender: JSX.Element
    action: Function
    assodId: number
    userId: number
    assos: any
}

export const InputForPosts = ({ sender, action, assodId, userId, assos }: InputPostProps) => {

    const { dispatch } = useStoreContext()

    const [value, setValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formatedValue = {
            owner: `api/users/${userId}`,
            content: value,
            association: `api/associations/${assodId}`,
        }
        action(dispatch, formatedValue);
        setValue('');
    }
    return (
        <div onSubmit={(e: any) => handleSubmit(e)} className='w-full h-64 bg-white rounded-md shadow-lg flex flex-col justify-between overflow-scroll p-3'>
            <div>{sender}</div>
            <div>
                <textarea value={value} onChange={(e: any) => handleChange(e)} className='w-full mt-2 min-h-52 border-none focus:outline-0' placeholder="C'est le moment de se faire des amis..." />
            </div>
            <div className="flex justify-end m-2">
                {/* <button onClick={(e: any) => handleSubmit(e)} className='rounded-lg p-2 bg-blue-400 text-white hover:bg-blue-500'>Envoyer</button> */}
                <ButtonDropdown assos={assos} action={() => { }} />
            </div>
        </div>
    )
}

export const FilterWithChip = ({ options }: { options: any }) => {
    const [active, setActive] = React.useState<string[]>([]);
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => {
        setActive(active.includes(value) ? active.filter(item => item !== value) : [...active, value]);
    }
    return (
        <>
            <div className="flex w-full bg-white rounded-lg p-2 justify-start mt-3">
                {options.map((option: any, index: number) => {
                    return (
                        <Chip
                            key={index}
                            label={option.name}
                            className='hover:cursor-pointer hover:bg-slate-300'
                            style={active.includes(option.name) ? { backgroundColor: '#B9B9B9', marginLeft: 5, marginRight: 5 } : {
                                marginLeft: 5,
                                marginRight: 5
                            }}
                            onClick={(e: any) => handleClick(e, option.name)}
                        />
                    )
                }
                )}
            </div>
        </>
    )
}

interface PostsProps {
    idPost: number;
    sender: JSX.Element;
    content: string;
    createdAt?: string;
    childPosts?: any;
    parentPost?: any
    idAssos?: number;
}

export const ChildPosts = ({ comment }: { comment: any }) => {
    const { state: { admin: { userList } } } = useStoreContext()
    return (
        <div className='flex flex-col w-full bg-white'>
            <div className="flex w-full justify-start px-3 py-1">
                <Avatar initial={getUserNameById(comment.owner.id, userList)} displayName={false} />
                <div className="p-2 rounded-md ml-2 shadow-lg bg-slate-100 my-1 flex flex-col">
                    <span className="text-sm text-slate-900 font-bold">{getUserNameById(comment.owner.id, userList)}</span>
                    <span className="text-sm text-slate-800">{moment(comment.createdAt).format('llll')}</span>
                    <span className="">{comment.content}</span>
                </div>
            </div>
        </div>
    )
}

export const Posts = ({ childPosts, content, sender, createdAt, idPost, idAssos }: PostsProps) => {
    const { dispatch, state: { user: { id }, assos: { assosList, needRefreshAssos } } } = useStoreContext()

    React.useEffect(() => {
        if (needRefreshAssos) { getAllAssosActions(dispatch) }
    }, [needRefreshAssos])

    const [value, setValue] = React.useState('');
    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>, data: string) => {
        if (e.key === 'Enter') {
            const formatedData = {
                owner: `api/users/${id}`,
                content: data,
                association: `api/associations/${idAssos}`,
            }
            postChildPostsAction(dispatch, formatedData, idPost)
            setValue('');
        }
    }
    return (
        <Fragment>
            <div className={`flex flex-col w-full p-1 bg-white mt-3 rounded-t-md shadow-lg max-h-96`}>
                <div className='flex flex-col w-full justify-evenly h-1/6 mb-2'>
                    <div className='flex flex-row justify-between'>
                        {sender}
                        <Chip label={getNameById(idAssos!, assosList)} size="small" color="primary" variant="outlined" className="w-fit" />
                    </div>
                    <div className='flex flex-col text-sm'>
                        {createdAt}
                    </div>
                </div>
                <div className='flex flex-col w-full border border-slate-200 rounded-md p-1'>
                    {content}
                </div>
            </div>
            <div className='flex flex-col w-full'>
                {childPosts.map((child: any, index: number) => {
                    return (
                        <ChildPosts key={index} comment={child} />
                    )
                }
                )}
            </div>
            <div className="w-full rounded-b-md bg-white flex justify-center p-1">
                <input type="text" placeholder="Répondre..." value={value} className="border focus:outline-0 p-2 w-full rounded-md" onKeyPress={(e) => handlePressEnter(e, value)} onChange={(e) => setValue(e.target.value)} />
            </div>
        </Fragment>
    )
}