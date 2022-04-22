import { findClient } from '../services/ClientServices';
import { useState } from 'react';
import AddClientCard from './AddClientCard';
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal';
import modalStyle from '../styles/Modals.module.css';
import MUIButton from "./MUIButton";
import MUITextField from "./MUITextField";

export default function ClientSearch ({ show, onHide, trainer }) {
    const [ state, setState ] = useState('searching');
    const [ client, setClient ] = useState('none');

    const setStateOfParent = () => {
        setState('searching');
    }

    const clientSearch = (e) => {
        e.preventDefault();
        const client = {
            username: e.target.username.value
        };

        findClient(client)
            .then(data => {
                if (data.message !== 'not found') {
                    setClient(data);
                    setState('found');
                }
                else {
                    setClient('none');
                    setState('not found');
                }
            })
            .catch(err => console.log(err));
    }

    if (state === 'searching') {
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
                    <h2>Search for a Client</h2>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <Form onSubmit={ clientSearch }>
                            <Form.Group>
                                <MUITextField fullWidth={true} id={'username'} label={'Username'} variant={'outlined'} color={'primary'} placeholder='Client Username'/>
                            </Form.Group>
                            <div className={ modalStyle.buttons }>
                                <MUIButton color={'neutral'} variant={'contained'} title={'Cancel'} onClick={ () => onHide(false) } size={'small'}/>
                                <MUIButton color={'primary'} type='submit' variant={'contained'} title={'Search'} size={'small'}/>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
    else if (state === 'found') {
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
                    <h2> Client Found </h2>
                </Modal.Header>
                <Modal.Body>
                    <AddClientCard trainer={ trainer } client={ client } changeState={ setStateOfParent }/>
                </Modal.Body>
            </Modal>
        )
    }
    else {
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
                    <h2> Client does not exist... </h2>
                </Modal.Header>
                <Modal.Body>
                    <div className={ modalStyle.buttons }>
                        <MUIButton color={'neutral'} variant={'contained'} title={'Back'} onClick={ setStateOfParent } size={'small'}/>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}