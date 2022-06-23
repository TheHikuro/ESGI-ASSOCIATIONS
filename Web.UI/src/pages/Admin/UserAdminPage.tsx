import { PencilIcon, TrashIcon, DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import { GridColDef } from "@mui/x-data-grid";
import React, { Fragment } from "react";
import { Dashboard } from "../../components/Dashboard";
import { FormComponents } from "../../components/FormData";
import { useModalContext } from "../../components/modal";
import { Table } from "../../components/Table";
import { getUsersActions, updateAdminUsersActions } from "../../utils/context/actions/admin";
import { getAllSections } from "../../utils/context/actions/section";
import { UsersDetails } from "../../utils/context/reducers/admin";
import { useStoreContext } from "../../utils/context/StoreContext";

const UserAdminPage = () => {
    const { dispatch, state: { admin: { userList, needRefresh }, section: { sectionList } } } = useStoreContext()
    const { openModal, updateModalTitle, updateModalContent } = useModalContext()

    React.useEffect(() => {
        if (needRefresh) { getUsersActions(dispatch) }
    }, [needRefresh])

    React.useEffect(() => {
        if (sectionList?.length === 0) { getAllSections(dispatch) }
    }, [sectionList]);

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
                    <TrashIcon className="h-5 w-5 hover:text-red-500 hover:cursor-pointer mr-2" onClick={() => { }} />
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
                <Table
                    data={userfromapi}
                    header={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    disableSelectionOnClick
                />
            </Dashboard>
        </div>
    );
}

export default UserAdminPage;