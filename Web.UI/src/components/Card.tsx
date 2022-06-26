import React from "react";

interface CardProps {
    // image?: string;
    desc: string;
    title: string;
    // join: boolean;
    test?: string;
}

export const Card = (props: CardProps) => {
    return (
        <div>
            <div className="text-orange-600	">{props.title}</div>
            <div className="text-orange-600	">{props.desc}</div>
            <button className="text-orange-600	"></button>
        </div>
    )
}