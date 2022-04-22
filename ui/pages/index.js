import Head from 'next/head'
import Link from 'next/link'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import landingStyle from '../styles/Landing.module.css'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { useRouter } from 'next/router';
import { AuthUser } from './../components/AuthUser';
import { destroyCookie } from 'nookies';


export default function index({auth, username, userType}) {

    const router = useRouter();

    const logoutOnClick = async () => {

        if(!auth) {
            router.push('/unauthorized');
        }
    
        else{
            
            try{            
            
            await destroyCookie(null, 'jwt', {path: '/',});

            router.reload();
            return { authMessage: 'User Is Logged Out!'};
            }catch(e){
            }
        }
        
    }

    const userProfile = () => {
        try{

            if(userType === 'trainer') {
                router.push('/trainers/' + username);
            }
            else if(userType === 'client') {
                router.push('/clients/' + username);
            }
            else return { authMessage: 'Inappropriate User Type!'};
        }catch(e){
            console.log(e)
        }
    }

    const authRender = () => {
        if(!auth){
            return(
                <div>
                <Head>
                    <title>DeagerVision</title>
                </Head>
                <main className={ landingStyle.container }>
                    <Navbar fixed='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand href="/"><span style={{color: '#2397a8'}}>Deager</span>Vision</Navbar.Brand>
                            <Nav>
                                <Nav.Link href='/login'>Login</Nav.Link>
                                <Nav.Link href='/registration'>Register</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                    <div className={ landingStyle.mainStyle }>
                        <h1>
                            About
                        </h1>
                        <h1>
                            <span>Deager</span>Vision
                            {/*<span>DeagerVision.</span>*/}
                        </h1>
                        <p>
                            Motivation is the biggest factor when it comes to health.
                            We want to help you overcome this hill by systematically
                            and seamlessly turning your short-term goals into sustainable habits.
                        </p>
                        <div>We are <span>DEDICATED</span> and <span>EAGER</span> to help.</div>
                    </div>
                </main>
            </div>
        )}

        else{
            return(
                <div>
                <Head>
                    <title>DeagerVision</title>
                </Head>
                <main className={ landingStyle.container }>
                    <Navbar fixed='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand href="/"><span style={{color: '#2397a8'}}>Deager</span>Vision</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Nav>
                                <Nav.Link onClick={() => userProfile()}>Profile</Nav.Link> 
                            </Nav>
                            <Nav>
                                <Nav.Link onClick={() => logoutOnClick()}>Logout</Nav.Link> 
                            </Nav>
                        </Container>
                    </Navbar>
                    <div className={ landingStyle.mainStyle }>
                        <h1>
                            Welcome Back,
                        </h1>
                        <h1>
                            <span>{JSON.stringify(username).split('"').join('')}!</span>
                        </h1>
                        <p>
                            Motivation is the biggest factor when it comes to health.
                            We want to help you overcome this hill by systematically
                            and seamlessly turning your short-term goals into sustainable habits.
                        </p>
                        <div>We are <span>DEDICATED</span> and <span>EAGER</span> to help.</div>
                    </div>
                </main>
            </div>
        )}
    }

    return authRender()

}


export async function getServerSideProps(ctx) {

    const resp = await AuthUser(ctx.req.cookies['jwt']);

    var username = await resp.username;
    var userType = await resp.userType;

    if(username === undefined) username = null
    if(userType === undefined) userType = null

    return {props: {auth: resp.isAuth, username: username, userType: userType}}

}
