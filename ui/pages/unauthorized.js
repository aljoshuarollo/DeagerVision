import Head from 'next/head';
import Link from 'next/link';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import landingStyle from '../styles/Landing.module.css';
import index from './index';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { AuthUser } from './../components/AuthUser';

export default function unauthorized ({auth}) {

    return(
        <div>
        <Head>
            <title>User Unauthorized</title>
        </Head>
        <main className={ landingStyle.container }>
            <Navbar fixed='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">DeagerVision</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Nav>
                        <Nav.Link href='/login'>Login</Nav.Link>
                        <Nav.Link href='/registration'>Register</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <div className={ landingStyle.mainStyle }>
                <h1>401 - Unauthorized 😱😨💀🤡</h1>
                <p>
                    You are not authorized for this action.
                </p>
            </div>
        </main>
    </div>)
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