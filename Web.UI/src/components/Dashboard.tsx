import { AcademicCapIcon, CameraIcon } from "@heroicons/react/outline"
import React from "react"
import { useNavigate, Link } from "react-router-dom"

interface DashboardItemsProps {
    name: string
    onpress: string
    icon: any
}

export const DashboardItem = ({ name, onpress, icon }: DashboardItemsProps) => {
    const location = window.location.pathname
    return (
        <Link to={`/Administration/${name}`}>
            <div className="py-1">
                <div className={`w-full h-12 items-center flex justify-between rounded-md p-2 hover:cursor-pointer hover:bg-slate-300 bg-slate-200 ${location === onpress ? 'bg-slate-300' : ''}`}>
                    {icon && icon}
                    {name}
                </div>
            </div>
        </Link>
    )
}

export const Dashboard = ({ children }: any) => {
    const navigate = useNavigate()
    return (
        <div className="w-full h-screen flex flex-col">
            <div className="w-full h-full px-10 py-10 z-10">
                <div className="w-full h-full bg-white shadow-xl rounded-md flex">
                    <div className="w-1/6 h-full bg-slate-100 rounded-l-md">
                        <div className="px-2 py-2 flex justify-between flex-col h-full">
                            <div className="h-3/4 w-full">
                                <h1 className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">Dashboard</h1>
                                <DashboardItem name='Users' icon={<AcademicCapIcon className="w-5 h-5" />} onpress='/Administration/quizz' />
                                <DashboardItem name='Associations' icon={<AcademicCapIcon className="w-5 h-5" />} onpress='/Administration/questions' />
                                <DashboardItem name='Sections' icon={<CameraIcon className="w-5 h-5" />} onpress='' />
                                <DashboardItem name='Evenements' icon={<CameraIcon className="w-5 h-5" />} onpress='' />
                                <DashboardItem name='Mail' icon={<CameraIcon className="w-5 h-5" />} onpress='' />
                            </div>
                            <div className="h-1/6 w-full flex justify-end flex-col">
                                <div className="p-3 rounded-md shadow-md bg-slate-200 uppercase text-sm hover:bg-slate-300 hover:text-red-500 text-center hover:cursor-pointer" onClick={() => navigate('/Home')}>Retour</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}