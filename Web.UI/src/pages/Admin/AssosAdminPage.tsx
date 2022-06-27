import { Dashboard } from "../../components/Dashboard";
import { GridColDef } from "@mui/x-data-grid";
import { Table } from "../../components/Table";
import { useStoreContext } from "../../utils/context/StoreContext";
import React from "react";
import { getAllAssosActions } from "../../utils/context/actions/assos";
import { PencilIcon, TrashIcon, DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import { AssosDetails } from "../../utils/context/reducers/assos";
import moment from "moment";
import { useModalContext } from "../../components/modal";
import { FormComponents } from "../../components/FormData";

const AssosAdminPage = () => {

    const { dispatch, state: { assos: { assosList, needRefresh } } } = useStoreContext()
    const { openModal, updateModalTitle, updateModalContent } = useModalContext()

    React.useEffect(() => {
        if (needRefresh) { getAllAssosActions(dispatch) }
    }, [needRefresh])

    const assosFromAPi = assosList && assosList.map((assos: AssosDetails) => {
        return {
            id: assos.id,
            name: assos.name,
            owner: assos.owner.firstname,
            description: assos.description,
            avatar: assos.avatar ? assos.avatar : '',
            createdAt: moment(assos.createdAt).format('DD/MM/YYYY'),
            actions: (
                <>
                    <PencilIcon className="h-5 w-5 hover:text-blue-500 hover:cursor-pointer mr-2" onClick={() => handleModalEdit(assos)} />
                    <TrashIcon className="h-5 w-5 hover:text-red-500 hover:cursor-pointer mr-2" onClick={() => { }} />
                    <DotsCircleHorizontalIcon className="h-5 w-5 hover:text-blue-500 hover:cursor-pointer" onClick={() => handleModalInfo(assos)} />
                </>
            )
        }
    })

    const columns: GridColDef[] = [
        { field: "name", headerName: "Nom", width: 200, align: 'left' },
        { field: "owner", headerName: "Propriétaire", width: 200, align: 'left' },
        { field: "description", headerName: "Description", width: 300, align: 'left' },
        { field: "createdAt", headerName: "Créé le", width: 200, align: 'left' },
        {
            field: "actions", headerName: "Actions", width: 200, align: 'right', renderCell: (params: any) => {
                return params.value
            }
        }
    ]

    const handleModalInfo = (assos: AssosDetails) => {
        updateModalTitle('Informations')
        updateModalContent(<div className="flex items-center">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <div className="text-lg font-bold">{assos.name}</div>
                    <div className="text-sm">{assos.description}</div>
                </div>
                <div className="flex flex-col">
                    <div className="text-sm">Propriétaire : {assos.owner.firstname}</div>
                    <div className="text-sm">Créé le : {moment(assos.createdAt).format('DD/MM/YYYY')}</div>
                </div>
            </div>
        </div>)
        openModal()
    }

    const handleModalEdit = (assos: AssosDetails) => {
        updateModalTitle('Edition')
        updateModalContent(
            <>
                <FormComponents
                    values={[
                        { label: 'Nom', type: 'text', formControlName: 'name', defaultValue: assos.name },
                        { label: 'Description', type: 'textarea', formControlName: 'description', defaultValue: assos.description },
                        // { label: 'Avatar', type: 'file', formControlName: 'avatar', defaultValue: 'avatar', accept: 'image/*' },
                    ]}
                    id={assos.id}
                    submitButtonText="Enregistrer"
                    action={() => { }}
                />
            </>
        )
        openModal()
    }


    return (
        <div className="h-screen flex w-full bg-[url('./assets/img/bg-login.jpeg')]">
            <Dashboard>
                <Table
                    data={assosFromAPi}
                    header={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    disableSelectionOnClick
                />
            </Dashboard>
        </div>
    );
}

export default AssosAdminPage;

