import Bootstrap from 'bootstrap/dist/css/bootstrap.css'

import { login } from "../services/LoginServices";
import loginStyle from '../styles/Login.module.css'
import Form from 'react-bootstrap/Form'
import { useRouter } from 'next/router';
import MUIButton from "./MUIButton";
import MUITextField from "./MUITextField";
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";

export default function Login () {
    // dynamic labels and error messages to guide users
    const [ usernameErrorMessage, setUsernameErrorMessage ] = useState('');
    const [ passwordErrorMessage, setPasswordErrorMessage ] = useState('');

    const router = useRouter();

    const checkEmptyInputs = (user) => {
        let passedChecks = true;
        if (user.username === '') {
            setUsernameErrorMessage('Username field cannot be empty!');
            passedChecks = false;
        }
        else {
            setUsernameErrorMessage('');
        }
        if (user.password === '') {
            setPasswordErrorMessage('Password field cannot be empty');
            passedChecks = false;
        }
        else {
            setPasswordErrorMessage('');
        }
        return passedChecks;
    }

    const loginUser = (e) => {
        e.preventDefault();
        const credentials = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };

        if (checkEmptyInputs(credentials)) {
            login(credentials)
                .then(response => {
                    if (response.status === 200) {
                        response.json().then(r => {
                            if (r.type === 'trainer') {
                                router.push(`/trainers/${r.username}`);
                            } else {
                                router.push(`/clients/${r.username}`);
                            }
                        })
                            .catch(err => console.log(err));
                    } else {
                        setUsernameErrorMessage('Invalid Credentials!');
                    }
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className={loginStyle.container}>
            <h1>
                Login
            </h1>
            <Form className={loginStyle.loginForm} onSubmit={ loginUser }>

                <h3><span style={{color: '#2397a8'}}>Deager</span>Vision</h3>
                <Form.Group className='mb-3'>
                    <Form.Label style={{ color: 'red', fontSize: '80%' }}>  { usernameErrorMessage }</Form.Label><br/>
                    <MUITextField id={'username'} label={'Username'} variant={'outlined'} color={'primary'}/>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label style={{ color: 'red', fontSize: '80%' }}>{ passwordErrorMessage }</Form.Label><br/>
                    <MUITextField type={'password'} id={'password'} label={'Password'} variant={'outlined'} color={'primary'}/>
                </Form.Group>

                <div className={loginStyle.buttonForm}>
                    <MUIButton color={'neutral'} variant={'contained'} href={'/'} title={'home'} startIcon={<HomeIcon/>} size={'small'}/>
                    <MUIButton color={'primary'} variant={'contained'} type={'submit'} title={'submit'} endIcon={<SendIcon/>} size={'small'}/>
                </div>
            </Form>
        </div>
    )
}