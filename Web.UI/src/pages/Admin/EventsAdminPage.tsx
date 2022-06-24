import { Dashboard } from "../../components/Dashboard";

const EventsAdminPage = () => {
    return (
        <div className="h-screen flex w-full bg-[url('./assets/img/bg-login.jpeg')]">
            <Dashboard>
                {/* <Table
                    data={userfromapi}
                    header={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    disableSelectionOnClick
                /> */}
            </Dashboard>
        </div>
    );
}

export default EventsAdminPage;