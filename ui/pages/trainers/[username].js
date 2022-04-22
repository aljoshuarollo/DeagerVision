import { getTrainer } from "../../services/TrainerServices";
import TrainerProfile from "../../components/TrainerProfile";
import { AuthUser } from './../../components/AuthUser';
import Head from 'next/head';

export default function trainerProfile({ trainer }) {
    return (
        <div>
            <Head>
                <title> { trainer.name }'s Profile</title>
            </Head>
            <main>
                <TrainerProfile trainer={ trainer }/>
            </main>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const params = ctx.params;

    const trainer = await getTrainer(params);
    const resp = await AuthUser(ctx.req.cookies['jwt']);

    var username = await resp.username;
    if(username === undefined) username = null

    if(!resp.isAuth || username !== trainer.username){
        return {
            redirect: {
              destination: '/unauthorized',
              permanent: false,
            },
        }
    }

    return {
        props: { trainer }
    }
}


