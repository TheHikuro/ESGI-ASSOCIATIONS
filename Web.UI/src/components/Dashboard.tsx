import { AcademicCapIcon, MailIcon, UserGroupIcon, UserIcon } from "@heroicons/react/outline"
import React, { Fragment } from "react"
import { useNavigate, Link } from "react-router-dom"
import { createAssosActions } from "../utils/context/actions/assos"
import { getMyAssosActions } from "../utils/context/actions/user"
import { MyAssosState } from "../utils/context/reducers/user"
import { useStoreContext } from "../utils/context/StoreContext"
import { whenPatternMatches } from "../utils/helpers/assist"
import { FormComponentCreate } from "./FormData"
import { useModalContext } from "./modal"

interface DashboardItemsProps {
    name: string
    onpress: string
    icon: any
    idAssos?: number
}

export const DashboardItem = ({ name, onpress, icon, idAssos }: DashboardItemsProps) => {
    const location = window.location.pathname
    const [display, setDisplay] = React.useState({
        admin: false,
        assos: false,
    })
    React.useEffect(() => {
        whenPatternMatches(window.location.pathname, [
            [/^\/Administration\/.*$/, () => setDisplay({
                admin: true,
                assos: false,
            })],
            [/^\/Gestion-Associations\/.*$/, () => setDisplay({
                admin: false,
                assos: true,
            })],
        ])
    }, [window.location.pathname])

    return (
        <Link to={display.admin ? `/Administration/${name}` : display.assos ? `/Gestion-Associations/${idAssos}` : ''}>
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
    const { dispatch, state: { assos: { assosList, needRefreshAssos }, user: { id, associations } } } = useStoreContext()
    const { updateModalContent, updateModalTitle, openModal } = useModalContext()

    React.useEffect(() => {
        if (needRefreshAssos) {
            getMyAssosActions(dispatch, id)
        }
    }, [needRefreshAssos])

    const [display, setDisplay] = React.useState({
        admin: false,
        assos: false,
    })

    React.useEffect(() => {
        whenPatternMatches(window.location.pathname, [
            [/^\/Administration\/.*$/, () => setDisplay({
                admin: true,
                assos: false,
            })],
            [/^\/Gestion-Associations\/.*$/, () => setDisplay({
                admin: false,
                assos: true,
            })],
            [/^\/Gestion-Associations.*$/, () => setDisplay({
                admin: false,
                assos: true,
            })]
        ])
    }, [window.location.pathname])

    const handleModalCreate = () => {
        updateModalTitle('Création association')
        updateModalContent(
            <Fragment>
                <FormComponentCreate
                    values={[
                        { label: 'Nom', type: 'text', formControlName: 'name' },
                        //{ label: 'Image de couverture', type: 'file', formControlName: 'avatar' },
                        { label: 'Description', type: 'textarea', formControlName: 'description' },
                    ]}
                    id={id}
                    submitButtonText="Créer"
                    action={createAssosActions}
                />
            </Fragment>
        )
        openModal()
    }
    return (
        <div className="w-full h-screen flex flex-col">
            <div className="w-full h-full px-10 py-10 z-10">
                <div className="w-full h-full bg-white shadow-xl rounded-md flex">
                    <div className="w-1/6 h-full bg-slate-100 rounded-l-md">
                        <div className="px-2 py-2 flex justify-between flex-col h-full">
                            <div className="h-3/4 w-full">
                                <h1 className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2">Dashboard</h1>
                                {display.admin ? (
                                    <>
                                        <DashboardItem name='Users' icon={<UserIcon className="w-5 h-5" />} onpress='/Administration/Users' />
                                        <DashboardItem name='Associations' icon={<UserGroupIcon className="w-5 h-5" />} onpress='/Administration/Associations' />
                                        <DashboardItem name='Sections' icon={<AcademicCapIcon className="w-5 h-5" />} onpress='/Administration/Sections' />
                                        <DashboardItem name='Mail' icon={<MailIcon className="w-5 h-5" />} onpress='/Administration/Mail' />
                                    </>
                                ) : display.assos ? (
                                    <>
                                        {associations.map((assos: MyAssosState) => {
                                            if (typeof assos.owner === 'string') {
                                                return (
                                                    Number(assos.owner.match(/\d*$/)![0]) === id ? (
                                                        <DashboardItem name={assos.name} icon={<AcademicCapIcon className="w-5 h-5" />} onpress={`/Gestion-Associations/${assos.id}`} idAssos={assos.id} />
                                                    ) : null
                                                )
                                            }
                                        })}
                                    </>
                                ) : <></>}

                            </div>
                            <div className="h-1/6 w-full flex justify-end flex-col">
                                {display.assos ? (
                                    <div className="p-3 mb-2 rounded-md shadow-md bg-slate-200 uppercase text-sm hover:bg-slate-300 hover:text-green-500 text-center hover:cursor-pointer" onClick={() => handleModalCreate()}>Ajouter association</div>
                                ) : ''}
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