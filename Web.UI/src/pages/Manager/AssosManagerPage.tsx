import { Dashboard } from "../../components/Dashboard";
import { GridColDef } from "@mui/x-data-grid";
import { Table } from "../../components/Table";
import { useStoreContext } from "../../utils/context/StoreContext";
import React, { Fragment } from "react";
import { createAssosActions, deleteAssosActions, deleteUserFromAsso, getAllAssosActions, updateAssosActions } from "../../utils/context/actions/assos";
import { PencilIcon, TrashIcon, DotsCircleHorizontalIcon, UserAddIcon } from "@heroicons/react/outline";
import { AssosDetails } from "../../utils/context/reducers/assos";
import moment from "moment";
import { useModalContext } from "../../components/modal";
import { FormComponentCreate, FormComponents } from "../../components/FormData";
import { getMembersAction } from "../../utils/context/actions/members";
import { useParams } from "react-router-dom";

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

    const columns: GridColDef[] = [
        { field: "firstName", headerName: "Prenom", width: 200, align: 'left' },
        { field: "lastName", headerName: "Nom", width: 200, align: 'left' },
        {
            field: "actions", headerName: "Actions", width: 200, align: 'right', renderCell: (params: any) => {
                return params.value
            }
        }
    ]

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
                    id={userId}
                    submitButtonText="Créer"
                    action={createAssosActions}
                />
            </Fragment>
        )
        openModal()
    }

    const handleDeleteUserFromAsso = (assoId: string, memberId: number) => {
        console.log(assoId, memberId)
        updateModalTitle('Bannir utilisateur')
        updateModalContent(<>Voulez vous vraiment supprimer cet utilisateur de votre association ?</>)
        yesNoModal()
        yesActionModal(() => {
            deleteUserFromAsso(dispatch, parseInt(assoId), memberId)
            closeModal()
        })
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
                    <div className="p-2 mr-2 rounded-md shadow-md bg-slate-200 uppercase text-sm hover:bg-slate-300 hover:text-red-500 text-center hover:cursor-pointer" onClick={() => handleModalCreate()}>Ajouter association</div>
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

