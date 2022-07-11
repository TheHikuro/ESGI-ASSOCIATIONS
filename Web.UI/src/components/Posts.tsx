import moment from "moment";
import React, { Fragment } from "react";
import { postChildPostsAction } from "../utils/context/actions/posts";
import { useStoreContext } from "../utils/context/StoreContext";
import { getUserNameById } from "../utils/helpers/assist";
import { Avatar } from "./Avatar";

export const InputForPosts = ({ sender, action }: { sender: JSX.Element, action: Function }) => {

    const [value, setValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        action(value);
    }
    return (
        <div onSubmit={(e: any) => handleSubmit(e)} className='w-full h-52 bg-white rounded-md shadow-lg flex flex-col justify-between overflow-scroll p-3'>
            <div>{sender}</div>
            <div>
                <textarea value={value} onChange={(e: any) => handleChange(e)} className='w-full min-h-52 border-none focus:outline-0' placeholder="C'est le moment de se faire des amis..." />
            </div>
            <div className="flex justify-end m-2">
                <button onClick={(e: any) => handleSubmit(e)} className='rounded-lg p-2 bg-blue-400 text-white hover:bg-blue-500'>Envoyer</button>
            </div>
        </div>
    )
}

// filter with dropdown
export const FilterCheckbox = ({ options }: { options: any }) => {
    const [value, setValue] = React.useState<string[]>([]);
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>, checked: boolean) => {
        const newValue = [...value];
        if (checked) {
            newValue.push(event.target.value as string);
        } else {
            newValue.splice(newValue.indexOf(event.target.value as string), 1);
        }
        setValue(newValue);
    }

    return (
        <div className='flex flex-col w-full p-2 bg-white mt-3 rounded-lg shadow-lg'>
            <div className='flex flex-row w-full justify-evenly'>
                {options.map((option: any, index: number) => {
                    return (
                        <div className='flex flex-row' key={index}>
                            <input
                                type='checkbox'
                                value={option.name}
                                onChange={(e) => handleChange(e, e.target.checked)}
                                checked={value.includes(option.name)}
                                className='hover:cursor-pointer'
                            />
                            <label className="ml-2">{option.name}</label>
                        </div>
                    )
                })}
            </div>
        </div>
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
            <div className="flex w-full justify-end px-3 py-1">
                <span className="p-2 rounded-md mr-4 shadow-lg bg-slate-100 my-1">{comment.content}</span>
                <Avatar initial={getUserNameById(comment.owner.id, userList)} />
            </div>
        </div>
    )
}

export const Posts = ({ childPosts, content, sender, createdAt, idPost, idAssos }: PostsProps) => {
    const { dispatch, state: { user: { id } } } = useStoreContext()
    const [value, setValue] = React.useState('');
    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>, data: string) => {
        if (e.key === 'Enter') {
            const formatedData = {
                owner: `api/users/${id}`,
                content: data,
                association: `api/associations/${idAssos}`,
                parentPost: `api/posts/${idPost}`,
            }
            postChildPostsAction(dispatch, formatedData)
            setValue('');
        }
    }
    return (
        <Fragment>
            <div className={`flex flex-col w-full p-1 bg-white mt-3 rounded-t-md shadow-lg max-h-96`}>
                <div className='flex flex-col w-full justify-evenly h-1/6 mb-2'>
                    <div className='flex flex-col'>
                        {sender}
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