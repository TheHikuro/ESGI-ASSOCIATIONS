import { Dashboard } from "../../components/Dashboard";
import { GridColDef } from "@mui/x-data-grid";
import { Table } from "../../components/Table";
import { useStoreContext } from "../../utils/context/StoreContext";
import React, { Fragment } from "react";
import { deleteUserFromAsso } from "../../utils/context/actions/assos";
import { TrashIcon, CalendarIcon } from "@heroicons/react/outline";
import { useModalContext } from "../../components/modal";
import { getMembersAction } from "../../utils/context/actions/members";
import { useParams } from "react-router-dom";
import { FormComponentCreate } from "../../components/FormData";
import { ChangeEventStatus, createEvent, getAllEventFromAssos } from "../../api/assos.axios";
import moment from "moment";

const AssosManagerPage = () => {

    const { dispatch, state: {
        members: {
            memberList,
            needRefreshMember
        }, user: { id: userId } } } = useStoreContext()
    const { openModal, updateModalTitle, updateModalContent, yesActionModal, yesNoModal, closeModal } = useModalContext()

    const [searchValue, setSearchValue] = React.useState('');
    const searchRegex = new RegExp(searchValue, 'i');
    const { id } = useParams();

    const [prevPath, setPrevPath] = React.useState(Number(id));

    React.useEffect(() => {
        if (Number(id) !== prevPath) {
            setPrevPath(Number(id));
            getMembersAction(dispatch, Number(id));
        }
    }, [prevPath, id]);

    React.useEffect(() => {
        if (needRefreshMember) { getMembersAction(dispatch, Number(id)) }
    }, [needRefreshMember])

    const membersfromapi = memberList.map(member => {
        return {
            id: member.id,
            firstName: member.firstname,
            lastName: member.lastname,
            actions: (
                <Fragment>
                    <TrashIcon className="h-5 w-5 hover:text-red-500 hover:cursor-pointer mr-2" onClick={() => (typeof id === 'string') && handleDeleteUserFromAsso(id, member.id)} />
                </Fragment>
            )
        }
    })
    const [EventsAssos, setEventsAssos]: any[] = React.useState([]);
    React.useEffect(() => {
        getAllEventFromAssos(Number(id)).then(res => {
            setEventsAssos(res.map(
                (event: any) => {
                    return {
                        id: event.id,
                        title: event.name,
                        dateStart: event.dateStart,
                        dateEnd: event.dateEnd,
                        active: event.active,
                        actions: (
                            <Fragment>
                                <CalendarIcon className="h-5 w-5 hover:text-red-500 hover:cursor-pointer mr-2" onClick={() => { }} />
                            </Fragment>
                        )
                    }
                }
            ));
        })

    }, [id, EventsAssos.length])

    const columns: GridColDef[] = [
        { field: "firstName", headerName: "Prenom", flex: 1, align: 'left' },
        { field: "lastName", headerName: "Nom", flex: 1, align: 'left' },
        {
            field: "actions", headerName: "Actions", flex: 1, align: 'right', renderCell: (params: any) => {
                return params.value
            }
        }
    ]

    const handleDeleteUserFromAsso = (assoId: string, memberId: number) => {
        updateModalTitle('Bannir utilisateur')
        updateModalContent(<>Voulez vous vraiment supprimer cet utilisateur de votre association ?</>)
        yesNoModal()
        yesActionModal(() => {
            deleteUserFromAsso(dispatch, parseInt(assoId), memberId)
            closeModal()
        })
        openModal()
    }

    const defaultDataToSend = (data: any) => {
        createEvent({
            association: `api/associations/${id}`,
            name: data.name,
            pointsToWin: Number(data.pointsToWin),
            dateStart: moment(data.startDate).format('YYYY-MM-DD HH:mm:ss'),
            dateEnd: moment(data.endDate).format('YYYY-MM-DD HH:mm:ss'),
            id: data.id,
        })
    }

    const handleModalCreateEvent = () => {
        updateModalTitle('Créer un événement')
        updateModalContent(
            <Fragment>
                <FormComponentCreate
                    values={[
                        { formControlName: 'name', label: 'Titre', type: 'text' },
                        { formControlName: 'pointsToWin', label: 'Point à gagner', type: 'number' },
                        { formControlName: 'startDate', label: 'Date de début', type: 'datetime-local' },
                        { formControlName: 'endDate', label: 'Date de fin', type: 'datetime-local' },
                    ]}
                    submitButtonText="Créer"
                    actionWithoutDispatch={defaultDataToSend}
                />
            </Fragment >
        )
        openModal()
    }

    const handleChangeStatusEvent = (eventId: number, status: boolean) => {
        const data = {
            active: status
        }
        ChangeEventStatus(eventId, data)
        closeModal()
    }

    const handleSeeMyEvents = () => {
        updateModalTitle('Mes événements')
        updateModalContent(
            <Fragment>
                {EventsAssos.map((event: any) => {
                    return (
                        <Fragment>
                            <div className="flex p-2 justify-between rounded-md shadow-md mt-1">
                                <div className="flex flex-col">
                                    <h1 className="font-bold">{event.title}</h1>
                                    <div className="flex">
                                        <span className="text-sm">{moment(event.dateStart).format('lll') + ' |'}</span>
                                        <span className="text-sm ml-1">{moment(event.dateEnd).format('lll')}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    {event.active ?
                                        <div className="p-2 shadow-md rounded-lg bg-green-500 text-white hover:cursor-pointer hover:shadow-lg" onClick={() => handleChangeStatusEvent(event.id, false)}>Actif</div>
                                        :
                                        <div className="p-2 shadow-md rounded-lg bg-red-500 text-white hover:cursor-pointer hover:shadow-lg" onClick={() => handleChangeStatusEvent(event.id, true)}>Inactif</div>
                                    }
                                </div>
                            </div>
                        </Fragment>
                    )
                })}
            </Fragment>
        )
        openModal()
    }

    return (
        <div className="h-screen flex w-full bg-[url('./assets/img/bg-login.jpeg')]">
            <Dashboard>
                <div className="w-full h-11 flex items-center justify-between">
                    <span className="uppercase font-bold ml-5">Manager</span>
                    <div className="flex items-center " onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}>
                        <input type="text" placeholder="Rechercher" className="p-1 bg-slate-300 rounded-lg mr-5 w-52" />
                    </div>
                    <div className="flex items-center">
                        <div className="p-1 shadow-md rounded-md mr-2 hover:text-blue-500 hover:cursor-pointer" onClick={handleSeeMyEvents}>
                            Voir mes Events
                        </div>
                        <div onClick={handleModalCreateEvent}>
                            <CalendarIcon className="h-7 w-7 mr-2 hover:cursor-pointer" />
                        </div>
                    </div>
                </div>

                <Table
                    data={membersfromapi.filter(member => { return searchRegex.test(member.firstName) || searchRegex.test(member.lastName) })}
                    header={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    disableSelectionOnClick
                    headerCustom
                />
            </Dashboard>
        </div>
    );
}

export default AssosManagerPage;