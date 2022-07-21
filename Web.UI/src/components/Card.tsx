import { ArrowRightIcon } from "@heroicons/react/outline";
import moment from "moment";
import React, { Fragment } from "react";
import { Avatar } from "./Avatar";
import { useModalContext } from "./modal";

interface CardProps {
    // image?: string;
    desc: string;
    name: string;
    createdAt: string;
    owner: string;
    joined: boolean;
}

const Joined = ({ joined }: { joined: boolean }) => {
    return (
        joined ? (
            <Fragment>
                <div className="p-2 shadow-md rounded-full bg-gray-300 flex items-center w-36 justify-center hover:cursor-not-allowed select-none">
                    <span className="items-center flex justify-center">Déja membre 🎉</span>
                </div>
            </Fragment >
        ) : (
            <Fragment>
                <div>
                    <div className="p-2 shadow-md rounded-full bg-blue-400 hover:bg-blue-500 flex items-center hover:text-white hover:cursor-pointer w-36 justify-center"
                        onClick={() => { alert('rejoindre') }}>
                        <span className="">Rejoindre</span>
                        <ArrowRightIcon className="h-5 w-5" />
                    </div>
                </div>
            </Fragment>
        )

    )
}

export const Card = (props: CardProps) => {
    const { desc, name, createdAt, owner, joined } = props;
    const { openModal, updateModalTitle, updateModalContent, closeModal } = useModalContext()
    const handleOpenModal = (props: CardProps) => {
        updateModalTitle(props.name);
        updateModalContent(<>
            <div className="flex justify-center">
                <img src="https://picsum.photos/800/400/?random" alt="asso" className="rounded-lg bg-cover h-64 w-full" />
            </div>
            <div className="flex justify-start mt-2">
                <p className="text-md">{props.desc}</p>
            </div>
            <div className="flex justify-start flex-col mt-3">
                <p className="text-sm">Créé le {moment(props.createdAt).format("DD/MM/YYYY")}</p>
                <p className="text-sm">Par {props.owner}</p>
            </div>
            <div className="flex justify-center">
                <Joined joined={joined} />
            </div>
        </>);
        openModal();
    }
    return (
        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article className="overflow-scroll rounded-xl shadow-xl bg-white max-h-96 h-96">

                <div onClick={() => handleOpenModal(props)}>
                    <img alt="Placeholder" className="block h-auto w-full hover:cursor-pointer" src="https://picsum.photos/600/400/?random" />
                </div>

                <header className="flex items-center justify-between leading-tight px-2 pt-2 md:p-2 ">
                    <h1 className="text-lg">
                        <span className=" text-slate-700 font-bold uppercase">
                            {name}
                        </span>
                    </h1>
                    <p className="text-grey-darker text-sm">
                        {moment(createdAt).format("DD/MM/YYYY")}
                    </p>
                </header>

                <footer className="flex items-center justify-between flex-col leading-none md:p-2">
                    <div className="flex flex-col text-justify">
                        {desc.substring(0, 100) ? desc.substring(0, 100) + '...' : desc}
                    </div>
                    <div className="flex items-center justify-between w-full mt-5">
                        <span className="flex items-center no-underline  text-black">
                            <Avatar initial={owner} displayName />
                        </span>
                        <Joined joined={joined} />
                    </div>
                </footer>
            </article>
        </div >
    )
}

