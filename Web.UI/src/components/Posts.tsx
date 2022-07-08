import React, { Fragment } from "react";

export const InputForPosts = ({ sender, content, action }: { sender: JSX.Element, content: string, action: Function }) => {

    const [value, setValue] = React.useState(content);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        action(value);
    }
    return (
        <div onSubmit={(e: any) => handleSubmit(e)} className='w-full h-44 bg-white rounded-md shadow-lg flex flex-col justify-between overflow-scroll p-3'>
            <div>{sender}</div>
            <div>
                <textarea value={value} onChange={(e: any) => handleChange(e)} className='w-full min-h-52 border-none focus:outline-0' placeholder="C'est le moment de ce faire des amis..." />
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
    sender: JSX.Element;
    content: string;
    createdAt: string;
    childPosts?: JSX.Element[];
    parentPost?: JSX.Element;
}

export const ChildPosts = ({ children }: { children: JSX.Element }) => {
    return (
        <div className='flex flex-col w-full bg-white shadow-lg'>
            <div className="flex w-full justify-end">
                <span className="p-2 rounded-md shadow-md mr-4 my-1">{children}</span>
            </div>
        </div>
    )
}

export const Posts = ({ childPosts, content, sender, createdAt }: PostsProps) => {
    return (
        <Fragment>
            <div className={`flex flex-col w-full p-2 bg-white mt-3 rounded-t-md shadow-lg h-72`}>
                <div className='flex flex-col w-full justify-evenly h-1/6 mb-2'>
                    <div className='flex flex-col'>
                        {sender}
                    </div>
                    <div className='flex flex-col text-sm'>
                        {createdAt}
                    </div>
                </div>
                <div className='flex flex-col w-full h-5/6 border border-slate-200 rounded-lg p-1'>
                    {content}
                </div>
            </div>
            <div className='flex flex-col w-full'>
                {childPosts && childPosts.map((child: JSX.Element, index: number) => {
                    return (
                        <ChildPosts key={index}>
                            {child}
                        </ChildPosts>
                    )
                }
                )}
            </div>
            <div>
                <input type="text" placeholder="Répondre" className="w-full focus:outline-0 p-2 rounded-b-md" />
            </div>
        </Fragment>
    )
}