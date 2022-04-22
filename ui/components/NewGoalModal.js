import modalStyle from '../styles/Modals.module.css';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import NewGoal from './NewGoal';
import NewGoalType from './NewGoalType';
import NewGoalDeadline from './NewGoalDeadline';

export default function NewGoalModal ({ show, onHide, username }) {
    const empty_goal = {
        username: '',
        goalName: '',
        goalType: '',
        deadline: '',
        goalDesc: '',
        amount: ''
    }
    const [ newGoalStage, setNewGoalStage ] = useState('goalName');
    const [ goalData, setGoalData ] = useState(empty_goal);

    const toGoalTypeFromGoalName = (goal) => {
        setGoalData(goal);
        setNewGoalStage('goalType');
    }

    const toProfile = () => {
        onHide(false);
        setGoalData(empty_goal);
        setNewGoalStage('goalName');
    }

    const toGoalNameFromGoalType = (goal) => {
        setGoalData(goal);
        setNewGoalStage('goalName');
    }

    const toDeadlineFromGoalType = (goal) => {
        setGoalData(goal);
        setNewGoalStage('goalDeadline');
    }

    const toGoalTypeFromDeadline = (goal) => {
        setGoalData(goal);
        setNewGoalStage('goalType');
    }

    const onNewGoalSubmit = () => {
        onHide(true);
        setGoalData(empty_goal);
        setNewGoalStage('goalName');
    }

    if (newGoalStage === 'goalName') {
        return (
            <Modal
                show={show}
                onHide={() => onHide(false)}
                size='md'
                aria-labelledby='contained-modal-title-vcenter'
                centered
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header className={modalStyle.headers}>
                    <h2>New Goal</h2>
                </Modal.Header>
                <Modal.Body className={modalStyle.basic}>
                    <NewGoal goalData={ goalData } username={ username } sendPrev={ toProfile } sendNext={ toGoalTypeFromGoalName } cancel={ toProfile } />
                </Modal.Body>
            </Modal>
        )
    }
    else if (newGoalStage === 'goalType') {
        return (
            <Modal
                show={show}
                onHide={() => onHide(false)}
                size='lg'
                aria-labelledby='contained-modal-title-vcenter'
                centered
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header className={modalStyle.headers}>
                    <h2>New Goal Type</h2>
                </Modal.Header>
                <Modal.Body className={modalStyle.basic}>
                    <NewGoalType goalData={ goalData } username={ username } sendPrev={ toGoalNameFromGoalType } sendNext={ toDeadlineFromGoalType } cancel={ toProfile } />
                </Modal.Body>
            </Modal>
        )
    }
    else if (newGoalStage === 'goalDeadline') {
        return (
            <Modal
                show={show}
                onHide={() => onHide(false)}
                size='md'
                aria-labelledby='contained-modal-title-vcenter'
                centered
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header className={modalStyle.headers}>
                    <h2>New Goal Deadline</h2>
                </Modal.Header>
                <Modal.Body className={modalStyle.basic}>
                    <NewGoalDeadline goalData={ goalData } username={ username } sendPrev={ toGoalTypeFromDeadline } sendNext={ onNewGoalSubmit } cancel={ toProfile } />
                </Modal.Body>
            </Modal>
        )
    }
    else {
        return (
            <div> </div>
        )
    }
}