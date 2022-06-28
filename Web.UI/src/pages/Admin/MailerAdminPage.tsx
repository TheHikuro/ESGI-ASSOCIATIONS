import { sendMailToAllUsers } from "../../api/users.axios.api";
import { Dashboard } from "../../components/Dashboard";
import { FormComponentCreate } from "../../components/FormData";

const MailerAdminPage = () => {
    const sendMailToAll = (data: { subject: string, body: string }) => {
        sendMailToAllUsers(data)
    }
    return (
        <div className="h-screen flex w-full bg-[url('./assets/img/bg-login.jpeg')]">
            <Dashboard>
                <FormComponentCreate
                    values={[
                        { label: "Sujet", formControlName: "subject", type: "text" },
                        { label: "Message", formControlName: "body", type: "textarea" },
                    ]}
                    submitButtonText="Envoyer à tous"
                    action={() => { }}
                    actionWithoutDispatch={sendMailToAll}
                    textOnSubmit='Envoyer à tous les utilisateurs'
                />
            </Dashboard>
        </div>
    );
}

export default MailerAdminPage;