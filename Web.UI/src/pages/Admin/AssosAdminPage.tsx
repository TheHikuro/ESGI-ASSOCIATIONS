import { Dashboard } from "../../components/Dashboard";
import { GridColDef } from "@mui/x-data-grid";
import { Table } from "../../components/Table";
import { useStoreContext } from "../../utils/context/StoreContext";
import React, { Fragment } from "react";
import { deleteAssosActions, getAllAssosActions, updateAssosActions } from "../../utils/context/actions/assos";
import { PencilIcon, TrashIcon, DotsCircleHorizontalIcon, UserAddIcon, DownloadIcon } from "@heroicons/react/outline";
import { AssosDetails } from "../../utils/context/reducers/assos";
import moment from "moment";
import { useModalContext } from "../../components/modal";
import { FormComponents } from "../../components/FormData";
import { exctratPresence } from "../../api/assos.axios";

const AssosAdminPage = () => {

    const { dispatch, state: { assos: { assosList, needRefreshAssos } } } = useStoreContext()
    const { openModal, updateModalTitle, updateModalContent, yesActionModal, yesNoModal, closeModal } = useModalContext()

    const [searchValue, setSearchValue] = React.useState('');
    const searchRegex = new RegExp(searchValue, 'i');

    React.useEffect(() => {
        if (needRefreshAssos) { getAllAssosActions(dispatch) }
    }, [needRefreshAssos])

    const assosFromAPi = assosList.map((assos: AssosDetails) => {
        return {
            id: assos.id,
            name: assos.name,
            owner: assos.owner.id,
            description: assos.description,
            avatar: assos.avatar,
            createdAt: moment(assos.createdAt).format('DD/MM/YYYY'),
            actions: (
                <Fragment>
                    <PencilIcon className="h-5 w-5 hover:text-blue-500 hover:cursor-pointer mr-2" onClick={() => handleModalEdit(assos)} />
                    <TrashIcon className="h-5 w-5 hover:text-red-500 hover:cursor-pointer mr-2" onClick={() => handleDeleteAssos(assos.id)} />
                    <DotsCircleHorizontalIcon className="h-5 w-5 hover:text-blue-500 hover:cursor-pointer" onClick={() => handleModalInfo(assos)} />
                </Fragment>
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
                    <div className="text-sm">Propriétaire : {assos.owner.id}</div>
                    <div className="text-sm">Créé le : {moment(assos.createdAt).format('DD/MM/YYYY')}</div>
                </div>
            </div>

        </div>)
        openModal()
    }

    const handleModalEdit = (assos: AssosDetails) => {
        updateModalTitle('Edition')
        updateModalContent(
            <Fragment>
                <FormComponents
                    values={[
                        { label: 'Nom', type: 'text', formControlName: 'name', defaultValue: assos.name },
                        { label: 'Description', type: 'textarea', formControlName: 'description', defaultValue: assos.description },
                    ]}
                    id={assos.id}
                    submitButtonText="Enregistrer"
                    action={updateAssosActions}
                />
            </Fragment>
        )
        openModal()
    }

    const handleDeleteAssos = (assosId: number) => {
        updateModalTitle('Suppression')
        updateModalContent(<>Voulez vous vraiment supprimer cette Association ?</>)
        yesNoModal()
        yesActionModal(() => {
            deleteAssosActions(dispatch, assosId)
            closeModal()
        })
        openModal()
    }

    const handleExtractPDF = () => {
        const data = {
            format: 'application/pdf',
        }
        exctratPresence(data)
    }

    return (
        <div className="h-screen flex w-full bg-[url('./assets/img/bg-login.jpeg')]">
            <Dashboard>
                <div className="w-full h-11 flex items-center justify-between">
                    <span className="uppercase font-bold ml-5">Associations</span>
                    <div className="flex items-center">
                        <div className="flex items-center " onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}>
                            <input type="text" placeholder="Rechercher" className="p-1 bg-slate-300 rounded-lg mr-3 w-52" />
                        </div>
                        <div className="flex items-center w-fit p-1 shadow-md bg-blue-300 hover:bg-blue-500 hover:cursor-pointer group rounded-md mr-3" onClick={handleExtractPDF}>
                            <span className="mx-2 group-hover:text-white">Extraction présence</span>
                            <DownloadIcon className="h-5 w-5 mr-2 group-hover:text-white hover:text-blue-500 hover:cursor-pointer" />
                        </div>
                    </div>
                </div>
                <Table
                    data={assosFromAPi.filter((item: any) => searchRegex.test((item.name)))}
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

export default AssosAdminPage;

