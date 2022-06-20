import React from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-screen bg-slate-500 mx-44 overflow-scroll p-5">
            {children}
        </div>
    )
}