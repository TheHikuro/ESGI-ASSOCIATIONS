import { useEffect, useState } from "react";
import { getAllAssos } from "../api/assos.axios.api";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";
import { Association } from "../models/association";

const AssosPage = () => {
    const [assos, setAssos] = useState<Association[]>([]);

    useEffect(()=> {
        getAssos();
    }, []);

    const getAssos = async () => {
        setAssos(await getAllAssos());
    }

    return (
        <Layout>
            <>
                <h1>Assos</h1>
                {assos.map(asso => <Card title={asso.title} desc={asso.description} key={asso.title}></Card>)}
            </>
        </Layout>
    );
}

export default AssosPage;