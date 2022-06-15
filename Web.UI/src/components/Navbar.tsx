import React from "react"
import { Link, Path, useNavigate } from "react-router-dom"
import { authLogoutRequest } from "../utils/context/actions/auth"
import { useStoreContext } from "../utils/context/StoreContext"
import Logo from '../assets/img/ESGI-logo.png'
import { AdjustmentsIcon, CalendarIcon, HomeIcon, TemplateIcon, UserGroupIcon, UserIcon } from "@heroicons/react/outline"

interface NavbarProps {
    children: React.ReactNode
    location: Path
}

const NavItem = ({ arr }: any) => {
    const active = location.pathname === arr.link
    return (
        <Link to={arr.link} className={`${active ? 'bg-white' : 'bg-slate-800'} flex justify-start items-center p-3 m-2 rounded-sm hover:bg-white group shadow-md w-full`}>
            <span className={`${active ? 'text-black' : 'text-white'}`}>{arr.icon}</span>
            <span className={`${active ? 'text-slate-700' : 'text-white'} group-hover:text-slate-700 ml-4`}>{arr.name}</span>
        </Link>
    )
}

const Navbar = ({ children, location }: NavbarProps) => {
    const isAdmin = true
    const isSuperAdmin = true
    const { dispatch } = useStoreContext()
    const navigate = useNavigate()
    const elements = [
        { name: 'Home', link: '/Home', icon: <HomeIcon className="h-7 w-7 group-hover:text-black" />, display: true },
        { name: 'Profile', link: '/Profile', icon: <UserIcon className="h-7 w-7 group-hover:text-black" />, display: true },
        { name: 'Associations', link: '/Associations', icon: <UserGroupIcon className="h-7 w-7 group-hover:text-black" />, display: true },
        { name: 'Calendrier', link: '/Calendrier', icon: <CalendarIcon className="h-7 w-7 group-hover:text-black" />, display: true },
        { name: 'Gestion Assosications', link: '/Gestion-Associations', icon: <TemplateIcon className="h-7 w-7 group-hover:text-black" />, display: isAdmin },
        { name: 'Adminstration', link: '/Administration', icon: <AdjustmentsIcon className="h-7 w-7 group-hover:text-black" />, display: isSuperAdmin },
    ]

    const [display, setDisplay] = React.useState(true)

    const whenPatternMatches = (string: string, patterns: Array<[RegExp, Function]>) => {
        const foundPattern = patterns.find(([pattern]) => pattern.exec(string));

        if (foundPattern) {
            const [, effect] = foundPattern;
            effect();
        }
    }

    React.useEffect(() => {
        whenPatternMatches(location.pathname, [
            [/^\/Administration\/.*$/, () => setDisplay(false)],
            [/^\/login\/?$/, () => setDisplay(false)],
            [/^\/register\/?$/, () => setDisplay(false)],
            [/^\/FirstPage\/?$/, () => setDisplay(false)],
        ])

        return () => {
            setDisplay(true)
        }
    }, [location.pathname])


    return (
        <>
            <div className='flex w-full'>
                {!display ? ('') : (
                    <div className="w-56 relative h-screen bg-gray-700 flex flex-col items-center justify-between">
                        <div className="my-3 flex items-center flex-col h-1/6">
                            <img src={Logo} alt="logo" className="h-32 w-32 mb-2" />
                            <span className="uppercase block text-gray-200 font-bold text-xl">ESGI</span>
                            <span className="uppercase block text-gray-200 font-bold text-xl">ASSOCIATIONS</span>
                            <hr className="bg-white w-full mt-3" />
                        </div>
                        <div className="w-full flex flex-col p-2 h-3/6">
                            {elements.map(element => {
                                if (element.display) {
                                    return (
                                        <div key={element.name} className="flex justify-center items-center">
                                            <NavItem arr={element} />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <div className="h-1/6 w-full flex justify-end flex-col">
                            <button className="text-slate-700 shadow-md hover:text-red-500 bg-white font-bold py-2 px-4 rounded-sm m-2" onClick={() => { authLogoutRequest(dispatch, navigate) }}>Déconnexion</button>
                        </div>
                    </div>
                )}
                {children}
            </div>
        </>
    )
}

export default Navbar