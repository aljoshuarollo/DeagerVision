import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import goalStyle from '../styles/Goal.module.css';
import Form from 'react-bootstrap/Form';
import NavBar from '../components/NavBar.js';
import { checkGoalName } from '../services/GoalServices';
import { useState } from 'react';
import MUITextField from './MUITextField';

export default function NewGoal ({ goalData, username, sendPrev, sendNext, cancel }) {

    const [ errorMessage, setErrorMessage ] = useState('')
    const [ emptyInput, setEmptyInputMessage ] = useState('')

    // Send relevant goal data to the next page if next button is clicked.
    const trySendNext = () => {
        if (document.getElementById('goalName').value === '')
        {
            setEmptyInputMessage('Enter a goal name!')
        }
        else if (document.getElementById('description').value === '')
        {
            setEmptyInputMessage('Enter a goal description!')
        }
        if (errorMessage === '' && document.getElementById('description').value !== '' && document.getElementById('goalName').value !== '') {
            goalData.username = username;
            goalData.goalName = document.getElementById('goalName').value;
            goalData.goalDesc = document.getElementById('description').value;
            sendNext(goalData);
        }
    }

    const handleChange = (e) => {
        const goal_data = {
            username,
            goalName: document.getElementById('goalName').value
        }
        checkGoalName(goal_data)
            .then((res) => {
                if (res.exists === 'false') {
                    setErrorMessage('')
                }
                else {
                    setErrorMessage('This goal name already exists! Pick a unique goal name.')
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={ goalStyle.newGoal }>
            <Form className={ goalStyle.goalForm }>
                <Form.Group className='mb-3'>
                    <Form.Label style={{ color: 'red' }}>{ errorMessage } { emptyInput }</Form.Label>
                    <p/>
                    <MUITextField id={'goalName'} label={'Goal Name'} defaultValue={ goalData.goalName } onChange={ handleChange } color={'primary'} variant={'outlined'} fullWidth={true}/>
                </Form.Group>

                <Form.Group className='mb-3' controlId='description'>
                    <MUITextField id={'description'} multiline={true} label={'Description'} defaultValue={ goalData.goalDesc } color={'primary'} variant={'outlined'} fullWidth={true}/>
                </Form.Group>

                <NavBar sendPrev={ sendPrev } sendNext={ trySendNext } cancel={ cancel } buttonTitle={ 'Next' } underLimit={ true }/>

            </Form>
        </div>
    )
}