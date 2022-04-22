import { trainClient } from '../services/TrainerServices';
import { useState } from 'react';
import { useRouter } from "next/router";
import modalStyle from '../styles/Modals.module.css';
import MUIButton from "./MUIButton";

export default function AddClientCard ({ trainer, client, changeState }) {

    const router = useRouter();

    const [ message, setMessage ] = useState('');

    const trainThisClient = () => {
        if (client.trainer === 'none') {
            const data = {
                trainer: trainer.username,
                client: {
                    username: client.username,
                    name: client.name
                }
            }
            trainClient(data)
                .then(() => {
                    setMessage('');
                    router.reload();
                })
                .catch(err => console.log(err));
        }
        else {
            setMessage('Cannot add: client already has a trainer!');
        }
    }

    return (
        <div>
            <div className={ modalStyle.body }>
                <h4> Name: <span>{ client.name }</span> </h4>
                <h4> Username: <span>{ client.username }</span> </h4>
                <h4> Trainer: <span>{ client.trainer }</span> </h4>
            </div>
            <div className={ modalStyle.alert }>
                <span> { message } </span>
            </div>
            <div className={ modalStyle.buttons }>
                <MUIButton color={'neutral'} variant={'contained'} title={'Back'} onClick={ changeState } size={'small'}/>
                <MUIButton color={'primary'} type='submit' variant={'contained'} title={'Train'} size={'small'} onClick={ trainThisClient }/>
            </div>
        </div>
    )
}