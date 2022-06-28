import React from "react";

interface CardProps {
    // image?: string;
    desc: string;
    name: string;
    // join: boolean;
}

export const Card = (props: CardProps) => {
    return (
        <div className="bg-gray-300 m-11 rounded-xl text-center w-44 h-80 p-3">
            <div className="h-full w-full flex justify-between flex-col">
                <div className="flex justify-center items-center flex-col">
                    <div className="rounded-full w-20 h-20 bg-white shadow-md">photo a ajouter</div>
                    <div className="text-gray-700">{props.name.length > 30 ? props.name.substring(0, 30) : props.name}</div>
                    <hr className="w-full h-2 mt-1"></hr>
                </div>
                <div className="text-gray-700 max-h-20">{props.desc.length > 50 ? props.desc.substring(0, 50) : props.desc}</div>
                <button className="text-gray-700 bg-gray-500 p-1 rounded-md">Rejoindre</button>
            </div>
        </div>
    )
}