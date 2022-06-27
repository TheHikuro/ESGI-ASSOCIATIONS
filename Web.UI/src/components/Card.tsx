import React from "react";

interface CardProps {
    // image?: string;
    desc: string;
    title: string;
    // join: boolean;
    test?: string;
}

export const Card = (props: CardProps) => {
    console.log(props.desc.length);
    return (
        <div className="bg-gray-300 m-11 rounded-xl text-center w-2/5 h-36 p-3">
            <div>photo a ajouter</div>
            <div className="text-gray-700">{props.title.length > 30 ? props.title.substring(0, 30) : props.title}</div>
            <hr></hr>
            <div className="text-gray-700 max-h-20">{props.desc.length > 70 ? props.desc.substring(0, 70) : props.desc}</div>
            <button className="text-gray-700 bg-gray-500 p-1 rounded-xl">Rejoindre</button>
        </div>
    )
}