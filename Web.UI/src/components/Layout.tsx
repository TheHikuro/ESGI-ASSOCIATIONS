import React from "react";

export const Layout = ({ children, large }: { children: React.ReactNode, large?: boolean }) => {
    return (
        <div className={`w-full h-screen flex flex-col bg-slate-600 ${large ? '' : 'mx-28'}  overflow-scroll p-5`}>
            {children}
        </div>
    )
}