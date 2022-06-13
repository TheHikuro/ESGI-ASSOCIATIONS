import { PencilIcon, TrashIcon, DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import { Dashboard } from "../../components/Dashboard";
import { useModalContext } from "../../components/modal";
import { Table } from "../../components/Table";
import { getUsersActions } from "../../utils/context/actions/admin";
import { useStoreContext } from "../../utils/context/StoreContext";

const UserAdminPage = () => {

    const { openModal, updateModalContent, updateModalTitle } = useModalContext()
    const { dispatch, state: { admin: { userList } } } = useStoreContext()

    React.useEffect(() => {
        if (userList?.length === 0) {
            getUsersActions(dispatch)
        }
    }, [userList])

    const userfromapi = userList?.map((user) => {
        const userRoles = user.roles?.map((role) => {
            return role.concat("")
        })
        return {
            id: user.id,
            name: user.firstname,
            lastname: user.lastname,
            pseudo: user.username,
            email: user.email,
            role: userRoles,
            sections: user.section.name,
            actions: (
                <>
                    <PencilIcon className="h-5 w-5 hover:text-blue-500 hover:cursor-pointer mr-2" />
                    <TrashIcon className="h-5 w-5 hover:text-red-500 hover:cursor-pointer mr-2" onClick={() => { }} />
                    <DotsCircleHorizontalIcon className="h-5 w-5 hover:text-blue-500 hover:cursor-pointer" onClick={() => handleInfoModal(user)} />
                </>
            )
        }
    })

    const handleInfoModal = (data: any) => {
        console.log(data);

        updateModalTitle("User Info")
        updateModalContent(
            <div>
                {data.firstname}
            </div>
        )
        openModal()
    }

    const columns: GridColDef[] = [
        /* {headerName: 'Id', field: 'id', width: 100, align: 'left' }, */
        { headerName: 'Prenom', field: 'name', width: 200, align: 'left' },
        { headerName: 'Nom', field: 'lastname', width: 200, align: 'left' },
        { headerName: 'Email', field: 'email', width: 200, align: 'left' },
        { headerName: 'Pseudo', field: 'pseudo', width: 200, align: 'left' },
        { headerName: 'Section', field: 'sections', width: 200, align: 'left' },
        { headerName: 'Roles', field: 'role', width: 200, align: 'left' },
        {
            headerName: 'Actions', field: 'actions', width: 200, align: 'right', renderCell: (params: any) => {
                return params.value
            }
        },
    ]

    return (
        <div className="h-screen flex w-full">
            <Dashboard>
                <Table
                    data={userfromapi}
                    header={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    onRowClick={(row: any) => { }}
                    disableSelectionOnClick
                />
            </Dashboard>
        </div>
    );
}

export default UserAdminPage;