import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import WorkoutCard from './ClickableCards/WorkoutCard';
import FoodCard from './ClickableCards/FoodCard';
import WaterCard from './ClickableCards/WaterCard';
import goalStyle from '../styles/Goal.module.css';
import NavBar from '../components/NavBar';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import MUITextField from './MUITextField';

export default function NewGoalType ({ goalData, username, sendPrev, sendNext, cancel }) {

    const [ errorMessage, setErrorMessage ] = useState('');
    const [ emptyInput, setEmptyInputMessage ] = useState('');
    const [ amountLabel, setAmountLabel ] = useState('Calories');
    const [ typeStyle, setTypeStyle ] = useState(goalData.goalType);
    const [ goalTypeSelect, setGoalType ] = useState('');

    const activeStyle = {
        scale: '1.1',
        borderColor: '#2397a8',
        boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)'
    };

    const inActiveStyle = {
        scale: '1'
    };

    // Goal type definition.
    const cardClicked = (type) => {
        goalData.goalType = type;
        if (type === 'food') {
            setAmountLabel('Calories')
            setTypeStyle('food')
        }
        else if (type === 'workout') {
            setAmountLabel('Workouts')
            setTypeStyle('workout')
        }
        else if (type === 'water') {
            setAmountLabel('Liters')
            setTypeStyle('water')
        }
        else {
            setAmountLabel('Amount')
            setTypeStyle('')
        }
    }

    // Send relevant goal data to the next page if next button is clicked.
    const trySendNext = () => {
        if (document.getElementById('amount').value === '')
        {
            setEmptyInputMessage('Enter a goal amount!')
        }
        else {
            setEmptyInputMessage('')
        }
        if (typeStyle === '')
        {
            setGoalType('Select a goal type!')
        }
        else
        {
            setGoalType('')
        }
        if (typeStyle !== '' && errorMessage === '' && document.getElementById('amount').value !== '') {
            goalData.goalType = typeStyle;
            goalData.goalAmount = document.getElementById('amount').value;
            sendNext(goalData);
        }
    }

    const checkCorrectFormat = (e) => {
        if (isNaN(document.getElementById('amount').value) && document.getElementById('amount').value !== '')
        {
            setErrorMessage('Invalid Goal Amount!')
        }
        else {
            setErrorMessage('')
            goalData.goalAmount = document.getElementById('amount').value
        }
    }

    return (
        <div className={ goalStyle.newGoal }>
            <div className={ goalStyle.cardForm }>
                <WorkoutCard onClick={ () => cardClicked('workout') } active={ typeStyle === 'workout' ? activeStyle : inActiveStyle }/>
                <FoodCard onClick={ () => cardClicked('food') } active={ typeStyle === 'food' ? activeStyle : inActiveStyle }/>
                <WaterCard  onClick={ () => cardClicked('water') } active={ typeStyle === 'water' ? activeStyle : inActiveStyle }/>
            </div>
            <Form className={ goalStyle.goalForm }>
                <Form.Group className='mb-3' controlId='amount'>
                    <Form.Label style={{ color: 'red' }}>{ errorMessage } { emptyInput } { goalTypeSelect }</Form.Label>
                    <p/>
                    <MUITextField defaultValue={ goalData.goalAmount } onChange={ checkCorrectFormat } color={'primary'} variant={'outlined'} label={amountLabel} fullWidth={true} id={'amount'} />
                </Form.Group>
                <NavBar sendPrev={ () => sendPrev(goalData) } sendNext={ trySendNext } cancel={ cancel } buttonTitle={ 'Next' } underLimit={ errorMessage === '' }/>
            </Form>
        </div>
    )
}