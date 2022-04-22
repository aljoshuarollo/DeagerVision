import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import modalStyle from '../styles/Modals.module.css';

export default function GoalCompletionModal ({ show, onHide }) {
    return (
        <Modal
            show={ show }
            onHide={ onHide }
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Modal.Header className={ modalStyle.headers }>
                <Modal.Title id='contained-modal-title-vcenter'>
                    <h2>Goal Completed!</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={ modalStyle.basic }>
                <h4>
                    Congratulations on completing your goal! <br/>
                    You should be proud of yourself for staying  <br/>
                    <span>Dedicated</span> and <span>Eager</span>. <br/> <br/>
                    Keep up the energy for your next goals!
                </h4>
            </Modal.Body>
            <Modal.Footer className={ modalStyle.buttons }>
                <Button onClick={ onHide } style={{ borderColor: '#2397a8', backgroundColor: '#2397a8'}}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}