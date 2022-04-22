import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import ProfileHeader from '../components/ProfileHeader';
import styles from '../styles/Home.module.css';
import PublicGoalList from '../components/PublicGoalList';
import React, { useState } from 'react';
import CompletedGoalList from './CompletedGoalList';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab';
import tabStyles from "../styles/Tabs.module.css";

export default function ClientProfile ({ client, priorityGoal }) {
    // the state of which goal list is selected
    const [ goalList, setGoalList ] = useState('current');

    const activeStyle = {
        textAlign: 'center',
        color: 'black',
        background: 'white',
        borderRadius: '5px',
        border: ' solid #2397a8 5px'
    };

    const inActiveStyle = {
        background: 'transparent',
        'border-color': 'transparent',
        'color': 'inherit'
    };

    let backButton = '/trainers/' + client.trainer;

    return (
        <div className={ styles.container }>
            <Navbar fixed='top' collapseOnSelect expand='lg' bg='dark' variant='dark'>
                <Container>
                    <Navbar.Brand href="/"><span style={{color: '#2397a8'}}>Deager</span>Vision</Navbar.Brand>
                    <Nav>
                        <Navbar.Brand>Client</Navbar.Brand>
                    </Nav>
                    <Nav>
                        <Nav.Link href={ backButton }>Profile</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <ProfileHeader user={ client } usertype={'Client'} imgRef={'/billiam.jpg'} show={ client.priorityGoal !== 'none' } goal={ priorityGoal.priorityGoal }/>

            <Tab.Container
                activeKey={ goalList }
                onSelect={(k) => setGoalList(k)}
                transition={ false }
                id='goalListTabs'
            >
                <Nav fill variant='tabs' className={ tabStyles.tabs } style={{ marginLeft: '240px', marginRight: '240px' }}>
                    <Nav.Item className={ tabStyles.tab }>
                        <Nav.Link eventKey='current' style={ goalList === 'current' ? activeStyle : inActiveStyle }>
                            <h1>Current Goals</h1>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className={ tabStyles.tab }>
                        <Nav.Link eventKey='completed' style={ goalList === 'completed' ? activeStyle : inActiveStyle }>
                            <h1>Completed Goals</h1>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content>
                    <Tab.Pane eventKey='current'>
                        <PublicGoalList client={ client }/>
                    </Tab.Pane>
                    <Tab.Pane eventKey='completed'>
                        <CompletedGoalList client={ client }/>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>
    )
}