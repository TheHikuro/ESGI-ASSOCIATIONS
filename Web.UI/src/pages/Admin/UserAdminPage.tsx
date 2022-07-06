import { PencilIcon, TrashIcon, DotsCircleHorizontalIcon, UserAddIcon } from "@heroicons/react/outline";
import { GridColDef } from "@mui/x-data-grid";
import React, { Fragment } from "react";
import { Dashboard } from "../../components/Dashboard";
import { FormComponents } from "../../components/FormData";
import { useModalContext } from "../../components/modal";
import { Table } from "../../components/Table";
import { deleteAdminUsersActions, getUsersActions, updateAdminUsersActions } from "../../utils/context/actions/admin";
import { getAllSections } from "../../utils/context/actions/section";
import { UsersDetails } from "../../utils/context/reducers/admin";
import { useStoreContext } from "../../utils/context/StoreContext";

const UserAdminPage = () => {
    const { dispatch, state: { admin: { userList, needRefreshAdmin }, section: { sectionList, needRefreshSection } } } = useStoreContext()
    const { openModal, updateModalTitle, updateModalContent, yesNoModal, yesActionModal, closeModal } = useModalContext()
    const [searchValue, setSearchValue] = React.useState('');
    const searchRegex = new RegExp(searchValue, 'i');

    React.useEffect(() => {
        if (needRefreshAdmin) { getUsersActions(dispatch) }
    }, [needRefreshAdmin])

    React.useEffect(() => {
        if (needRefreshSection) { getAllSections(dispatch) }
    }, [needRefreshSection]);

    const userfromapi = userList && userList.map((user: UsersDetails) => {
        return {
            id: user.id,
            name: user.firstname,
            lastname: user.lastname,
            pseudo: user.username,
            email: user.email,
            role: user.roles,
            sections: user.section.name,
            actions: (
                <>
                    <PencilIcon className="h-5 w-5 hover:text-blue-500 hover:cursor-pointer mr-2" onClick={() => handleModalUpdate(user)} />
                    <TrashIcon className="h-5 w-5 hover:text-red-500 hover:cursor-pointer mr-2" onClick={() => handleDeleteModal(user.id)} />
                    <DotsCircleHorizontalIcon className="h-5 w-5 hover:text-blue-500 hover:cursor-pointer" onClick={() => handleModalInfo(user)} />
                </>
            )
        }
    })

    const handleModalInfo = (data: UsersDetails) => {
        updateModalTitle(`Informations de ${data.firstname} ${data.lastname}`)
        updateModalContent(
            <>
                <div className="flex h-full w-full flex-col ">
                    <span> ID : {data.id} </span>
                    <span> Prenom : {data.firstname} </span>
                    <span> Nom : {data.lastname} </span>
                    <span> Pseudo : {data.username} </span>
                    <span> Email : {data.email} </span>
                    <span> Section : {data.section.name} </span>
                    <span> Roles : {data.roles} </span>
                </div>
            </>
        )
        openModal()
    }

    const handleModalUpdate = (data: UsersDetails) => {
        updateModalTitle(`Modification de ${data.firstname} ${data.lastname}`)
        updateModalContent(
            <Fragment>
                <FormComponents
                    values={[
                        { label: "Prenom", formControlName: "firstname", type: "text", defaultValue: data.firstname },
                        { label: "Nom", formControlName: "lastname", type: "text", defaultValue: data.lastname },
                        { label: "Pseudo", formControlName: "username", type: "text", defaultValue: data.username },
                        { label: "Email", formControlName: "email", type: "text", defaultValue: data.email },
                        {
                            label: "Section", formControlName: "section", type: "text", defaultValue: `/api/sections/${data.section.id}`, dropdown: true, options: sectionList?.map((section: { id: number; name: string; }) => {
                                return {
                                    value: `/api/sections/${section.id}`,
                                    label: section.name
                                }
                            })
                        },
                        { label: "Roles", formControlName: "roles", type: "text", defaultValue: data.roles, isArray: true },
                    ]}
                    submitButtonText="Modifier"
                    id={data.id}
                    action={updateAdminUsersActions}
                />
            </Fragment>
        )
        openModal()
    }

    const handleDeleteModal = (userId: number) => {
        updateModalTitle(`Suppression de l'utilisateur`)
        updateModalContent(<>Voulez-vous vraiment supprimer cet utilisateur ?</>)
        yesNoModal()
        yesActionModal(() => {
            deleteAdminUsersActions(dispatch, userId)
            closeModal()
        })
        openModal()
    }

    const columns: GridColDef[] = [
        { headerName: 'Prenom', field: 'name', width: 200, align: 'left' },
        { headerName: 'Nom', field: 'lastname', width: 200, align: 'left' },
        { headerName: 'Email', field: 'email', width: 200, align: 'left' },
        { headerName: 'Pseudo', field: 'pseudo', width: 200, align: 'left' },
        { headerName: 'Section', field: 'sections', width: 100, align: 'left' },
        { headerName: 'Roles', field: 'role', width: 200, align: 'left' },
        {
            headerName: 'Actions', field: 'actions', width: 100, align: 'right', renderCell: (params: any) => {
                return params.value
            }
        },
    ]

    return (
        <div className="h-screen flex w-full bg-[url('./assets/img/bg-login.jpeg')]">
            <Dashboard>
                <div className="w-full h-11 flex items-center justify-between">
                    <span className="uppercase font-bold ml-5">Utilisateurs</span>
                    <div className="flex items-center " onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}>
                        <input type="text" placeholder="Rechercher" className="p-1 bg-slate-300 rounded-lg mr-5 w-52" />
                    </div>
                </div>
                <Table
                    data={Object.values(userfromapi).filter((item: any) => searchRegex.test((item.lastname)) || searchRegex.test((item.email)) || searchRegex.test((item.lastname)))}
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

export default UserAdminPage;