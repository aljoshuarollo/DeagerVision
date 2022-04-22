import { getClient } from '../../../services/ClientServices';
import PublicClientProfile from '../../../components/PublicClientProfile';
import Head from 'next/head';
import { getPriorityGoal } from "../../../services/GoalServices";
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

export default function clientProfile({ client, priorityGoal }) {
    return (
        <div>
            <Head>
                <title> { client.name }'s Profile</title>
            </Head>
            <main>
                <PublicClientProfile client={ client } priorityGoal={ priorityGoal }/>
            </main>
        </div>

    )
}

export async function getServerSideProps({ params }) {
    const client = await getClient(params);
    const priorityGoal = await getPriorityGoal({ username: client.username });
    return {
        props: { client, priorityGoal }
    }
}