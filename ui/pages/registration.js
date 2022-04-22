import Registration from '../components/Registration'
import Head from "next/head";
import { AuthUser } from './../components/AuthUser';

export default function registration () {
    return (
        <div>
            <Head>
                <title>Registration</title>
            </Head>
            <main>
                <Registration />
            </main>
        </div>
    )
}

export async function getServerSideProps(ctx) {

    const resp = await AuthUser(ctx.req.cookies['jwt']);


    if(resp.isAuth){
        return {
            redirect: {
              destination: '/',
              permanent: false,
            },
        }
    }

    return {props: {auth: resp.isAuth}}

}