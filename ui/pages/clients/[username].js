import { getClient } from "../../services/ClientServices";
import ClientProfile from "../../components/ClientProfile";
import { getPriorityGoal, checkGoalDeadline } from "../../services/GoalServices";
import { AuthUser } from './../../components/AuthUser';
import Head from 'next/head';

export default function clientProfile({ client, priorityGoal, goalList }) {
    return (
        <div>
            <Head>
                <title> { client.name }'s Profile</title>
            </Head>
            <main>
                <ClientProfile client={ client } priorityGoal={ priorityGoal } deadlineGoals={ goalList }/>
            </main>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const params = ctx.params;

    const client = await getClient(params);
    const priorityGoal = await getPriorityGoal({ username: client.username });
    const passedDeadlineGoals = await checkGoalDeadline(params);

    const resp = await AuthUser(ctx.req.cookies['jwt']);

    var username = await resp.username;
    if(username === undefined) username = null

    if(!resp.isAuth || username !== client.username){
        return {
            redirect: {
              destination: '/unauthorized',
              permanent: false,
            },
        }
    }

    return {
        props: { client, goalList: passedDeadlineGoals, priorityGoal }
    }
}
