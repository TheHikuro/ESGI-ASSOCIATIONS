import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { getAllAssosActions } from "../utils/context/actions/assos";
import { AssosDetails } from "../utils/context/reducers/assos";
import { useStoreContext } from "../utils/context/StoreContext";

const AssosPage = () => {
    const { dispatch, state: { assos: { assosList, needRefresh } } } = useStoreContext();
    useEffect(() => {
        if (needRefresh) {
            getAllAssosActions(dispatch);
        }
    }, [needRefresh])
    return (
        <Layout>
            <>
                <h1 className="flex justify-center font-bold uppercase text-slate-800">Rejoindre une Association ESGI</h1>
                <div className="container my-12 mx-auto px-4 md:px-12">
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        {
                            assosList.map((asso: AssosDetails) =>
                                <Card
                                    name={asso.name}
                                    desc={asso.description}
                                    key={asso.name}
                                    createdAt={asso.createdAt}
                                    owner={asso.owner.firstname + ' ' + asso.owner.lastname}
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