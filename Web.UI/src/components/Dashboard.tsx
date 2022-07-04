import { AcademicCapIcon, CameraIcon } from "@heroicons/react/outline"
import React from "react"
import { useNavigate, Link } from "react-router-dom"
import { useStoreContext } from "../utils/context/StoreContext"
import { EveryRoles } from "../utils/helpers/enums"

interface DashboardItemsProps {
    name: string
    onpress: string
    icon: any
}

export const DashboardItem = ({ name, onpress, icon }: DashboardItemsProps) => {
    const location = window.location.pathname
    const { dispatch, state: { user: { roles } } } = useStoreContext()
    const isAdmin = roles.includes(EveryRoles[0].value)
    const isAssosManager = roles.includes(EveryRoles[1].value)

    return (
        <Link to={ isAdmin ? `/Administration/${name}` : isAssosManager ? `/Gestion-Associations/${name}`: ''}>
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
    const { dispatch, state: { user: { roles } } } = useStoreContext()
    const isAdmin = roles.includes(EveryRoles[0].value)
    const isAssosManager = roles.includes(EveryRoles[1].value)

    return (
        <div className="w-full h-screen flex flex-col">
            <div className="w-full h-full px-10 py-10 z-10">
                <div className="w-full h-full bg-white shadow-xl rounded-md flex">
                    <div className="w-1/6 h-full bg-slate-100 rounded-l-md">
                        <div className="px-2 py-2 flex justify-between flex-col h-full">
                            <div className="h-3/4 w-full">
                                <h1 className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">Dashboard</h1>
                                {isAdmin ? (
                                    <>
                                        <DashboardItem name='Users' icon={<AcademicCapIcon className="w-5 h-5" />} onpress='/Administration/Users' />
                                        <DashboardItem name='Associations' icon={<AcademicCapIcon className="w-5 h-5" />} onpress='/Administration/Associations' />
                                        <DashboardItem name='Sections' icon={<CameraIcon className="w-5 h-5" />} onpress='/Administration/Sections' />
                                        <DashboardItem name='Mail' icon={<CameraIcon className="w-5 h-5" />} onpress='/Administration/Mail' />
                                    </>
                                ) : isAssosManager ? (
                                    <>
                                        <DashboardItem name='Users' icon={<AcademicCapIcon className="w-5 h-5" />} onpress='/Gestion-Associations/Users' />
                                        <DashboardItem name='Associations' icon={<AcademicCapIcon className="w-5 h-5" />} onpress='/Gestion-Associations/Associations' />
                                        <DashboardItem name='Mail' icon={<CameraIcon className="w-5 h-5" />} onpress='/Gestion-Associations/Mail' />
                                    </>
                                ) : <></>}


                            </div>
                            <div className="h-1/6 w-full flex justify-end flex-col">
                                <div className="p-3 rounded-md shadow-md bg-slate-200 uppercase text-sm hover:bg-slate-300 hover:text-red-500 text-center hover:cursor-pointer" onClick={() => navigate('/Home')}>Retour</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full">
                        <div className="w-full h-full">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}