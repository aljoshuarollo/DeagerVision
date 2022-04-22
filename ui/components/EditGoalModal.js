import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { editGoalDeadline, editGoalDescription } from "../services/GoalServices";
import modalStyle from '../styles/Modals.module.css';
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import MUIButton from "./MUIButton";
import MUITextField from "./MUITextField";
import goalStyle from "../styles/Goal.module.css";
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import MUICheckBox from "./MUICheckBox";

export default function EditGoalModal ({ show, onHide, username, goalName, goalDesc, deadlineList, priorityGoal }) {

    const [ errorMessage, setErrorMessage ] = useState('')
    const [ disableSubmit, setDisableSubmit ] = useState(false);
    const [ checked, setChecked ] = useState(false);
    // edit the description of the current goal
    const goalChange = (e) => {

        let newDeadline = document.getElementById('newDeadline');
        if (newDeadline !== null) {
            if (newDeadline.value !== '') {
                editDeadline();
            }
        }

        e.preventDefault();
        const goalData = {
            username,
            goalName,
            description: document.getElementById('description').value,
            priorityGoal: checked
        };

        editGoalDescription(goalData)
            .then(() => {
                onHide(true);
            })
            .catch(err => {
                console.log(err);
                onHide(false);
            })
    }

    const editDeadline = () => {
        const goalData = {
            username,
            goalName,
            deadline: document.getElementById('newDeadline').value
        }

        editGoalDeadline(goalData)
            .catch(err => console.log(err));
    }

    const checkCorrectFormat = (e) => {
        let deadlineString = document.getElementById('newDeadline').value;
        if (deadlineString.includes('/')) {
            setDisableSubmit(true);
            let deadlineFormat = deadlineString.split('/');
            if (deadlineFormat.length === 3) {
                let matchFormatCount = 0;
                for (let i = 0; i < deadlineFormat.length; i++) {
                    if (!isNaN(deadlineFormat[i]) && deadlineFormat[i] !== '') {
                        matchFormatCount++;
                    }
                }
                if (matchFormatCount < 3) {
                    setErrorMessage("Invalid format!");
                } else if (matchFormatCount === 3) {
                    setErrorMessage('');
                    setDisableSubmit(false);
                }
            }

        } else if (isNaN(deadlineString) && document.getElementById('newDeadline').value !== '') {
            setErrorMessage("Invalid format!");
            setDisableSubmit(true);

        } else {
            setErrorMessage('');
            setDisableSubmit(false);
        }
    }

    const checkPastDeadline = () => {
        let goalExists = false;
        deadlineList.forEach((goal) => {
            if (goalName === goal.goalName) {
                goalExists = true;
            }
        })
        if (goalExists) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <Form.Label style={{ color: 'red' }}>Current Deadline Expired</Form.Label><br/>
                    <Form.Label style={{ color: 'red' }}>{ errorMessage }</Form.Label>
                    <div className={ goalStyle.calendarForm }>
                        <MUITextField id={'newDeadline'} label={'New Deadline'} placeholder={'DD/MM/YYYY'} variant={'outlined'} color={'primary'} onChange={ checkCorrectFormat } size={'small'}/>
                    </div>
                </div>
            )
        }
        return null;
    }


    function hideModal() {
        setErrorMessage('');
        onHide(false);
    }

    const changeChecked = (e) => {
        setChecked(e.target.checked);
    }

    function checkPriorityMatched() {
        if (goalName === priorityGoal.goalName) {
            return(
                <MUICheckBox disabled={true} checked={true} control={<Checkbox/>} label={'Make Priority Goal'}/>
            )
        }
        return (
            <MUICheckBox control={<Checkbox/>} label={'Make Priority Goal'} onChange={ changeChecked }/>
        )
    }

    return (
        <Modal
            show={ show }
            onHide={ () => onHide(false)}
            size='md'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            backdrop='static'
            keyboard={ false }
        >
            <Modal.Header className={ modalStyle.headers }>
                <h2> Edit Goal: <span>{ goalName }</span> </h2>
            </Modal.Header>
            <Modal.Body className={ modalStyle.editGoal }>
                <div>
                    <Form onSubmit={ goalChange }>
                        <Form.Group className='mb-3'>
                            <MUITextField id={'description'} label={'Goal Description'} variant={'outlined'} color={'primary'} multiline={true} fullWidth={true} defaultValue={goalDesc}/>
                        </Form.Group>

                        <div className={goalStyle.calendarForm}>
                            { checkPriorityMatched() }
                            </div>


                        { checkPastDeadline() }
                        <div className={ modalStyle.buttons }>
                            <MUIButton onClick={ () => hideModal() } color={'cancel'} variant={'contained'} title={'cancel'} startIcon={<CloseIcon/>}/>
                            <MUIButton color={'primary'} variant={'contained'} type={'submit'} title={'submit'} endIcon={<SendIcon/>} disabled={disableSubmit}/>
                        </div>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    )
}