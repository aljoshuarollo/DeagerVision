import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import Link from 'next/link';
import Table from 'react-bootstrap/Table';
import goalStyle from '../styles/GoalList.module.css';
import Button from 'react-bootstrap/Button';
import { deleteClient } from "../services/TrainerServices";
import { useRouter } from 'next/router';
import { BsFillTrashFill } from "react-icons/bs";

export default function ClientList({trainer}) {
    const router = useRouter();

    // delete a goal from the user permanently
    const deleteThisClient = (client) => {
        const data = {
            trainer: trainer.username,
            client: {
                username: client.username,
                name: client.name
            }
        }
        deleteClient(data)
            .then(() => router.reload())
            .catch(err => console.log(err));
    }

    if (trainer.users.length > 0) {
        return (
            <div>
                <div className={goalStyle.table_header}>
                    <div>
                        <h2>Clients</h2>
                    </div>
                </div>
                <Table className='text-center mx-auto' striped bordered hover style={{width: '63vw'}}>
                    <thead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Username</th>
                        <th scope='col'>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {trainer.users.map(client =>
                        <tr key={client.client.username}>
                            <td><h3>{client.client.name}</h3></td>
                            <Link href={`/clients/public/${client.client.username}`}>
                                <td>
                                    <h3 className={goalStyle.clientLink}>{client.client.username}</h3>
                                </td>
                            </Link>
                            <td><Button onClick={() => deleteThisClient(client.client)} variant='primary mx-1' style={{
                                height: 50,
                                width: 50,
                                backgroundColor: 'white',
                                borderColor: '#2397a8'
                            }}><BsFillTrashFill style={{color: '#2397a8'}}/></Button></td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>
        )
    }
    else {
        return (
            <div style={{ padding: '25px', textAlign: 'center' }}>
                <h2>No Clients</h2>
            </div>
        )
    }
}