import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { getUsersActions } from "../utils/context/actions/admin";
import { getAllAssosActions } from "../utils/context/actions/assos";
import { AssosDetails } from "../utils/context/reducers/assos";
import { useStoreContext } from "../utils/context/StoreContext";
import { getUserNameById } from "../utils/helpers/assist";

const AssosPage = () => {
    const { dispatch, state: {
        assos: { assosList, needRefreshAssos },
        admin: { userList, needRefreshAdmin },
        members: { needRefreshMember },
        user: { id }
    } } = useStoreContext();
    useEffect(() => {
        if (needRefreshAssos) getAllAssosActions(dispatch);
    }, [needRefreshAssos, needRefreshMember])

    useEffect(() => {
        if (needRefreshAdmin) getUsersActions(dispatch);
    }, [needRefreshAdmin])

    return (
        <Layout>
            <>
                <h1 className="flex justify-center font-bold uppercase text-slate-50">Rejoindre une Association ESGI</h1>
                <div className="container my-12 mx-auto px-4 md:px-12">
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        {
                            assosList.map((asso: AssosDetails) =>
                                <Card
                                    name={asso.name}
                                    desc={asso.description}
                                    key={asso.name}
                                    createdAt={asso.createdAt}
                                    owner={getUserNameById(asso.owner.id, userList)}
                                    joined={asso.members.find(member => member.id === id) ? true : false}
                                    idAssos={asso.id}
                                />
                            )
                        }
                    </div>
                </div>
            </>
        </Layout>
    );
}

export default AssosPage;