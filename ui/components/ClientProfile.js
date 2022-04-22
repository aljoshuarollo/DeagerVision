import styles from '../styles/Home.module.css';
import ProfileHeader from '../components/ProfileHeader';
import tabStyles from '../styles/Tabs.module.css';
import GoalList from '../components/GoalList';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import CompletedGoalList from './CompletedGoalList';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { destroyCookie } from 'nookies';
import NewGoalModal from './NewGoalModal';

export default function ClientProfile ({ client, priorityGoal, deadlineGoals }) {
    // the state of which goal list is selected
    const [ goalList, setGoalList ] = useState('current');
    // create new goal modal visibility
    const [ newGoalModal, setNewGoalModal ] = useState(false);

    // hide the new goal modal
    const hideNewGoalModal = (reload) => {
        setNewGoalModal(false);
        if (reload) {
            router.reload();
        }
    }

    const activeStyle = {
        textAlign: 'center',
        color: 'black',
        background: 'white',
        borderRadius: '5px',
        border: ' solid #2397a8 5px'
    };

    const inActiveStyle = {
        background: 'transparent',
        borderColor: 'transparent',
        color: 'inherit'
    };

    const router = useRouter();

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

            <NewGoalModal show={ newGoalModal } onHide={ hideNewGoalModal } username={ client.username }/>

            <Navbar fixed='top' collapseOnSelect expand='lg' bg='dark' variant='dark' style={{ minWidth:'1600px' }}>
                <Container>
                    <Navbar.Brand href="/"><span style={{color: '#2397a8'}}>Deager</span>Vision</Navbar.Brand>
                    <Nav>
                        <Nav.Link onClick={ () => setNewGoalModal(true) } className={ styles.navButton }><h3>Create New Goal</h3></Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={ logoutOnClick }>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <ProfileHeader user={ client } usertype={'Client'} imgRef={'/billiam.jpg'} show={ client.priorityGoal !== 'none' } goal={ priorityGoal.priorityGoal }/>

            <Tab.Container
                activeKey={ goalList }
                onSelect={(k) => setGoalList(k)}
                transition={ false }
                id='goalListTabs'
                style={{ minWidth:'1600px' }}
            >
                <Nav fill variant='tabs' className={ tabStyles.tabs }>
                    <Nav.Item  className={ tabStyles.tab }>
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
                        <GoalList client={ client }  username={ client.username } passedDeadlineGoals={ deadlineGoals } priorityGoal={priorityGoal.priorityGoal}/>
                    </Tab.Pane>
                    <Tab.Pane eventKey='completed'>
                        <CompletedGoalList client={ client }/>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </div>
    )
}

