import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import { checkNewRegistration, registerClient, registerTrainer } from '../services/RegistrationServices';
import loginStyle from '../styles/Login.module.css';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import MUITextField from "./MUITextField";
import MUIButton from "./MUIButton";
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from "../styles/MUIStyle";
import goalStyle from "../styles/Goal.module.css";

export default function Registration () {
    // dynamic labels and error messages to guide users
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ userType, setUserType ] = useState('client');
    const router = useRouter();

    const registerUser = (user, e) => {
        if (userType === 'client') {
            registerClient(user)
                .then(client => router.push('/'))
                .catch(err => console.log(err));
        } else {
            registerTrainer(user)
                .then(trainer => router.push('/'))
                .catch(err => console.log(err));
        }
    }

    const checkEmptyInputs = (user) => {
        let passedChecks = true;
        if (user.name === '') {
            setErrorMessage('Name field cannot be empty!');
            passedChecks = false;
        }
        else if (user.username === '') {
            setErrorMessage('Username field cannot be empty!');
            passedChecks = false;
        }
        else if (user.emailAddress === '') {
            setErrorMessage('Email Address field cannot be empty!');
            passedChecks = false;
        }
        else if (user.password === '') {
            setErrorMessage('Password field cannot be empty!');
            passedChecks = false;
        }
        else if (document.getElementById('confirmPassword').value !== '' && document.getElementById('confirmPassword').value !== user.password)
        {
            setErrorMessage('Passwords do not match!');
            passedChecks = false;
        }
        else {
            setErrorMessage('');
        }
        return passedChecks;
    }

    const register = (e) => {
        e.preventDefault();
        const user = {
            name: document.getElementById('name').value,
            username: document.getElementById('username').value,
            emailAddress: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        if (checkEmptyInputs(user)) {
            checkNewRegistration(user)
                .then(res => {
                    let passedChecks = true;
                    if (res.availableUsername) {
                        setErrorMessage('');
                    } else {
                        setErrorMessage('Username already exists!');
                        passedChecks = false;
                    }
                    if (res.availableEmailAddress) {
                        setErrorMessage('');
                    } else {
                        setErrorMessage('Email already in use!');
                        passedChecks = false;
                    }
                    if (passedChecks) {
                        registerUser(user, e);
                    }
                })
                .catch(err => console.log(err));
        }
    }

    const handleUserType = (e, newUserType) => {
        setUserType(newUserType);
    }

    return (
        <div className={ loginStyle.container }>
            <h1>
                Registration
            </h1>
            <Form.Label style={{ color: 'red' }}>{ errorMessage }</Form.Label>
            <Form className={ loginStyle.loginForm } onSubmit={ register }>
                <Form.Group className='mb-3'>
                    <MUITextField variant={'outlined'} color={'primary'} fullWidth={true} label='Name' id={'name'} type={'text'}/>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <MUITextField variant={'outlined'} color={'primary'} fullWidth={true} label='Username' id={'username'} type={'text'} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <MUITextField variant={'outlined'} color={'primary'} fullWidth={true} label='E-mail' id={'email'} type={'email'} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <MUITextField variant={'outlined'} color={'primary'} fullWidth={true} label='Password' id={'password'} type={'password'} />
                </Form.Group>

                <Form.Group className='mb-3'>
                    <MUITextField variant={'outlined'} color={'primary'} fullWidth={true} label='Confirm Password' id={'confirmPassword'} type={'password'} />
                </Form.Group>

                <div className={goalStyle.calendarForm}>
                    <ThemeProvider theme={theme}>
                        <ToggleButtonGroup value={userType} exclusive onChange={handleUserType} color='primary'>
                            <ToggleButton value='client'>Client</ToggleButton>
                            <ToggleButton value='trainer'>Trainer</ToggleButton>
                        </ToggleButtonGroup>
                    </ThemeProvider>
                </div>

                <div className={ loginStyle.buttonForm }>
                    <MUIButton color={'neutral'} variant={'contained'} href={'/'} title={'home'} startIcon={<HomeIcon/>} size={'small'}/>
                    <MUIButton color={'primary'} variant={'contained'} type={'submit'} title={'submit'} endIcon={<SendIcon/>} size={'small'}/>
                </div>
            </Form>
        </div>
    )
}