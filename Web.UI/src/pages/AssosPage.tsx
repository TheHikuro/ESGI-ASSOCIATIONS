import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Layout } from "../components/Layout";

const AssosPage = () => {
    
    return (
        <Layout>
            <>
                <h1>Rejoindre une Association ESGI</h1>
                <div className="flex flex-wrap ">
                    {assos.map(asso => <Card title={asso.title} desc={asso.description} key={asso.title}></Card>)}
                </div>
            </>
        </Layout>
    );
}

export default AssosPage;