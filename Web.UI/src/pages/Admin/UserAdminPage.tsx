import { PencilIcon, TrashIcon, DotsCircleHorizontalIcon } from "@heroicons/react/outline";
import { GridColDef } from "@mui/x-data-grid";
import { Dashboard } from "../../components/Dashboard";
import { useModalContext } from "../../components/modal";
import { Table } from "../../components/Table";

const UserAdminPage = () => {

    const { openModal, updateModalContent, updateModalTitle } = useModalContext()

    const handleInfoModal = (data: any) => {
        updateModalTitle("User Info")
        updateModalContent(
            <div>
                {data.row.name}
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
        { headerName: 'Section', field: 'section', width: 200, align: 'left' },
        {
            headerName: 'Actions', field: 'actions', width: 200, align: 'right', renderCell: (row: any) => row.value === true ?
                <>
                    <PencilIcon className="h-5 w-5 hover:text-blue-500 hover:cursor-pointer mr-2" />
                    <TrashIcon className="h-5 w-5 hover:text-red-500 hover:cursor-pointer mr-2" onClick={() => { }} />
                    <DotsCircleHorizontalIcon className="h-5 w-5 hover:text-blue-500 hover:cursor-pointer" onClick={() => handleInfoModal(row)} />
                </> : ''
        },
    ]

    const rows: any[] = [
        { id: 1, name: 'Loan', email: 'loan.cleris@gmail.com', pseudo: 'Hikuro', section: 'IW3', lastname: 'CLERIS', actions: true },
        { id: 2, name: 'Loan', email: 'loan.cleris@gmail.com', pseudo: 'Hikuro', section: 'IW3', lastname: 'CLERIS', actions: true },
        { id: 3, name: 'Loan', email: 'loan.cleris@gmail.com', pseudo: 'Hikuro', section: 'IW3', lastname: 'CLERIS', actions: true },
        { id: 4, name: 'Loan', email: 'loan.cleris@gmail.com', pseudo: 'Hikuro', section: 'IW3', lastname: 'CLERIS', actions: true },
        { id: 5, name: 'Loan', email: 'loan.cleris@gmail.com', pseudo: 'Hikuro', section: 'IW3', lastname: 'CLERIS', actions: true },
        { id: 6, name: 'Loan', email: 'loan.cleris@gmail.com', pseudo: 'Hikuro', section: 'IW3', lastname: 'CLERIS', actions: true },
    ]

    return (
        <div className="h-screen flex w-full">
            <Dashboard>
                <Table
                    data={rows}
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