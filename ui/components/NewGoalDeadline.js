import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import { useState } from 'react';
import styles from '../styles/Home.module.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createGoal } from '../services/GoalServices';
import NavBar from './NavBar';
import goalStyle from '../styles/Goal.module.css';
import Form from 'react-bootstrap/Form';

export default function NewGoalDeadline ({ goalData, username, sendPrev, sendNext, cancel }) {

    const [ value, onChange ] = useState(goalData.deadline === '' ? new Date() : goalData.deadline);
    const [ errorMessage, setErrorMessage ] = useState('')

    // Check if the chosen deadline is a week or less away.
    const underLimit = (newDate) => {
        goalData.deadline = newDate;
        let today = new Date();
        if (Math.abs(newDate.getDate() - today.getDate()) > 7) {
            setErrorMessage('The limit to set a goal is a week!')
        }
        else {
            setErrorMessage('')
        }
        onChange(newDate)
    }

    // Create the new goal on submit.
    const createNewGoal = (e) => {
        e.preventDefault();
        goalData.deadline = value.toLocaleString('en-US', {timeZone: 'America/Regina'});
        const goal = {
            username: username,
            goalName: goalData.goalName,
            goalType: goalData.goalType,
            deadline: value.toLocaleString('en-US', {timeZone: 'America/Regina'}),
            description: goalData.goalDesc,
            amount: goalData.goalAmount
        }
        if (errorMessage === '') {
            createGoal(goal)
                .then(() => sendNext())
                .catch(err => console.log(err));
        }
    }

    return(
        <div className={ goalStyle.newGoal }>
            <Form className={ goalStyle.goalForm }>
                <Form.Label style={{ color: 'red' }}>{ errorMessage }</Form.Label>

                <div className={ goalStyle.calendarForm }>
                    <Calendar onChange={ underLimit } value={ value }/>
                </div>

                <div className={ goalStyle.deadlineNavForm }>
                    <NavBar sendPrev={ () => sendPrev(goalData) } sendNext={ createNewGoal } cancel={ cancel } underLimit={ errorMessage === '' } buttonTitle={ 'Submit' }/>
                </div>
            </Form>
        </div>
    )
}
