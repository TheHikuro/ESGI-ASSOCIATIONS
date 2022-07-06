import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { getAllAssosActions } from "../utils/context/actions/assos";
import { useStoreContext } from "../utils/context/StoreContext";

const AssosPage = () => {
    const { dispatch, state: { assos: { assosList, needRefreshAssos } } } = useStoreContext();
    useEffect(() => {
        if (needRefreshAssos) {
            getAllAssosActions(dispatch);
        }
    }, [needRefreshAssos])
    return (
        <Layout>
            <>
                <h1 className="flex justify-center"><b>Rejoindre une Association ESGI</b></h1>
                <div className="flex flex-wrap w-full">
                    {assosList.map(asso => <Card name={asso.name} desc={asso.description} key={asso.name}></Card>)}
                </div>
            </>
        </Layout>
    );
}

export default AssosPage;