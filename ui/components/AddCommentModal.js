import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import { addGoalComment } from '../services/GoalServices';
import Modal from 'react-bootstrap/Modal';
import modalStyle from '../styles/Modals.module.css';
import MUITextField from "./MUITextField";
import MUIButton from "./MUIButton";

export default function AddComment ({ show, onHide, username, goalName, goalComment }) {

    const addThisComment = (e) => {
        e.preventDefault();
        const comment_data = {
            username,
            goalName,
            comment: document.getElementById('comment').value
        }
        addGoalComment(comment_data)
            .then(() => {
                onHide(true);
            })
            .catch(err => {
                console.log(err);
                onHide(false);
            })
    }

    return (
        <Modal
            show={ show }
            onHide={ () => onHide(false) }
            size='md'
            aria-labelledby='contained-modal-title-vcenter'
            centered
            backdrop='static'
            keyboard={ false }
        >
            <Modal.Header className={ modalStyle.headers }>
                <h2>Add Comment</h2>
            </Modal.Header>
            <Modal.Body className={ modalStyle.basic }>
                <div>
                    <h4> Goal Name: <span>{ goalName }</span> </h4>
                    <form onSubmit={ addThisComment }>
                        <MUITextField id={'comment'} label={'Goal Comment'} variant={'outlined'} color={'primary'} placeholder={'Add a Comment'} fullWidth={true} multiline={true} defaultValue={goalComment}/>
                        <div className={ modalStyle.buttons }>
                            <MUIButton onClick={() => onHide(false)} variant={'contained'} color={'cancel'} title={'cancel'}/>
                            <MUIButton type={'submit'} variant={'contained'} color={'primary'} title={'submit'}/>
                        </div>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}