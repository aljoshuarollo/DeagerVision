import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import Modal from 'react-bootstrap/Modal';
import { parseDate } from "./GoalList";
import MUIButton from "./MUIButton";
import modalStyle from '../styles/Modals.module.css';

export default function DeadlineModal({ show, onHide, deadlineList }) {

    const showDeadline = (deadline) => {
        return(
            <p> Goal: { deadline.goalName } - Deadline: { parseDate(deadline.deadline) } </p>
        )
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size='md'
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Modal.Header  className={ modalStyle.headers }>
                <Modal.Title id='contained-modal-title-vcenter' style={{ color: 'red' }}>
                    Goals With Expired Deadlines ⚠️
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={ modalStyle.editGoal }>
                <ul>
                    {
                        deadlineList.map(deadline =>
                            <li key={ deadline.goalName }  > { showDeadline(deadline) } </li>
                    )}
                </ul>
                <div className={ modalStyle.buttons }>
                    <MUIButton color={'cancel'} variant={'contained'} title={'Close'} onClick={ onHide } size={'small'}/>
                </div>
            </Modal.Body>
        </Modal>
    );
}