import { Dashboard } from "../../components/Dashboard";
import { GridColDef } from "@mui/x-data-grid";
import { Table } from "../../components/Table";
import { useStoreContext } from "../../utils/context/StoreContext";
import React from "react";
import { getAllAssosActions } from "../../utils/context/actions/assos";

const AssosAdminPage = () => {

    const { dispatch, state: { assos: { assosList, needRefresh } } } = useStoreContext()

    React.useEffect(() => {
        if (needRefresh) {
            getAllAssosActions(dispatch)
        }
    }, [needRefresh])

    const assosFromAPi = [
        { id: 1, name: "Section 1" },
    ]

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 100 },
    ]
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

