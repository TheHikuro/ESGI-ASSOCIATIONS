import { PencilIcon, TrashIcon, UserAddIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";
import { Dashboard } from "../../components/Dashboard";
import { Table } from "../../components/Table";
import { createSectionAction, deleteSectionActions, getAllSections, updateSections } from "../../utils/context/actions/section";
import { SectionDetails } from "../../utils/context/reducers/sections";
import { useStoreContext } from "../../utils/context/StoreContext";
import { GridColDef } from "@mui/x-data-grid";
import { useModalContext } from "../../components/modal";
import { FormComponentCreate, FormComponents } from "../../components/FormData";

const SectionsAdminPage = () => {

    const { dispatch, state: { section: { sectionList, needRefreshSection } } } = useStoreContext();
    const { openModal, updateModalTitle, updateModalContent, yesNoModal, yesActionModal, closeModal } = useModalContext();
    React.useEffect(() => {
        if (needRefreshSection) { getAllSections(dispatch) }
    }, [needRefreshSection]);

    const sectionsFromApi = sectionList.map((section: SectionDetails) => {
        return {
            id: section.id,
            name: section.name,
            actions: (
                <>
                    <PencilIcon className="h-5 w-5 hover:text-blue-500 hover:cursor-pointer mr-2" onClick={() => handleEditSection(section)} />
                    <TrashIcon className="h-5 w-5 hover:text-red-500 hover:cursor-pointer mr-2" onClick={() => handleDeleteSection(section)} />
                </>
            )
        }
    })

    const columns: GridColDef[] = [
        { headerName: "ID", field: "id", flex: 1, align: 'left' },
        { headerName: "Nom", field: "name", flex: 1, align: 'left' },
        { headerName: "Actions", field: "actions", flex: 1, align: 'right', renderCell: (data) => { return data.value } }
    ];

    const handleEditSection = (section: SectionDetails) => {
        updateModalTitle('Modifier une section');
        updateModalContent(
            <Fragment>
                <FormComponents
                    values={[
                        { defaultValue: section.name, formControlName: 'name' },
                    ]}
                    submitButtonText="Modifier"
                    id={section.id}
                    action={updateSections}
                />
            </Fragment>
        )
        openModal();
    }

    const handleCreateSection = () => {
        updateModalTitle('Créer une section');
        updateModalContent(
            <Fragment>
                <FormComponentCreate
                    values={[
                        { formControlName: 'name' },
                    ]}
                    submitButtonText="Créer"
                    action={createSectionAction}
                />
            </Fragment>
        )
        openModal();
    }

    const handleDeleteSection = (section: SectionDetails) => {
        updateModalTitle('Supprimer une section');
        updateModalContent(<>Voulez vous supprimer la section {section.name} ?</>)
        yesNoModal()
        yesActionModal(() => {
            deleteSectionActions(dispatch, section.id)
            closeModal();
        })
        openModal();
    }

    return (
        <div className="h-screen flex w-full bg-[url('./assets/img/bg-login.jpeg')]" >
            <Dashboard>
                <div className="w-full h-11 flex items-center justify-between">
                    <span className="uppercase font-bold ml-5">Sections</span>
                    <div className="flex items-center ">
                        <div onClick={handleCreateSection} className='mr-5'>
                            <UserAddIcon className="h-5 w-5 hover:text-blue-500 hover:cursor-pointer" />
                        </div>
                    </div>
                </div>
                <Table
                    data={sectionsFromApi}
                    header={columns}
                    pageSize={20}
                    rowsPerPageOptions={[5, 10, 20, 50]}
                    disableSelectionOnClick
                    headerCustom
                />
            </Dashboard>
        </div >
    );
}

export default SectionsAdminPage;