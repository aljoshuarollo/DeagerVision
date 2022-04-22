import Login from "../components/Login";
import Head from 'next/head';
import { AuthUser } from './../components/AuthUser';

export default function login () {

    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <main>
                <Login />
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