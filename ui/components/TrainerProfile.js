import styles from '../styles/Home.module.css';
import React, { useState } from 'react';
import ClientList from './ClientList';
import ProfileHeader from '../components/ProfileHeader';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ClientSearchModal from './ClientSearchModal';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import { AiOutlineHome } from "react-icons/ai";

export default function TrainerProfile ({ trainer }) {
    // visibility of client search modal
    const [ modalSearchShow, setModalSearchShow ] = useState(false);

    const router = useRouter();

    const hideSearchModal = () => {
        setModalSearchShow(false);
    }

    const logoutOnClick = async () => {
            
        try{            
        
        await destroyCookie(null, 'jwt', {path: '/',});

        router.push('/');
        return { authMessage: 'User Is Logged Out!'};
        }catch(e){
        }
    }

    return (
        <div className={ styles.container }>
            <Navbar fixed='top' collapseOnSelect expand='lg' bg='dark' variant='dark'>
                <Container>
                    <Navbar.Brand href="/"><span style={{color: '#2397a8'}}>Deager</span>Vision</Navbar.Brand>
                    <Nav>
                        <Nav.Link onClick={() => setModalSearchShow(true)} className={ styles.navButton }><h3>Search for Client</h3></Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={() => logoutOnClick() }>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <ProfileHeader user={ trainer } userType={ 'Trainer' } imgRef = {'/billhandsomesquidward.jpg'}/>
            <ClientList trainer={ trainer } />
            <ClientSearchModal show={ modalSearchShow } onHide={ hideSearchModal } trainer={ trainer }/>
        </div>
    )
}