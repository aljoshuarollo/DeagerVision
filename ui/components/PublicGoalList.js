import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AddCommentModal from './AddCommentModal';
import { BsFillChatRightTextFill } from "react-icons/bs";
import {parseDate} from "./GoalList";

export default function PublicGoalList ({ client }) {
    // visibility of add comment modal
    const [ modalCommentShow, setModalCommentShow ] = useState(false);
    // the goal name currently selected for adding a comment to
    const [ goalToComment, setGoalToComment ] = useState('none');
    // the goal comment currently selected for editing
    const [ goalComment, setGoalComment ] = useState('none');
    const router = useRouter();

    // reveal the goal commenting modal
    const addComment = (goalName, goalComment) => {
        setGoalToComment(goalName);
        setGoalComment(goalComment);
        setModalCommentShow(true);
    }

    // hide the goal commenting modal
    const hideSearchModal = (reload) => {
        setModalCommentShow(false);
        if (reload) {
            router.reload();
        }
    }

    const temp = (goal) => {
        if (goal.goalType.type === 'Food') {
            return (
                <tr key={ goal.goalName }>
                    <td> { goal.goalName } </td>
                    <td> { goal.description } </td>
                    <td> { goal.comment } </td>
                    <td> { goal.goalType.type } </td>
                    <td> Calories: { goal.goalType.calories } </td>
                    <td> { parseDate(goal.deadline) } </td>
                    <td> <Button onClick={() => addComment(goal.goalName, goal.comment) } style={{ height: 50, width: 50, backgroundColor: 'white', borderColor: '#2397a8'}}><BsFillChatRightTextFill style={{ color: '#2397a8'}}/></Button> </td>
                </tr>
            )
        }
        else if (goal.goalType.type === 'Water') {
            return (
                <tr key={ goal.goalName }>
                    <td> { goal.goalName } </td>
                    <td> { goal.description } </td>
                    <td> { goal.comment } </td>
                    <td> { goal.goalType.type } </td>
                    <td> Volume: { goal.goalType.volume } </td>
                    <td> { parseDate(goal.deadline) } </td>
                    <td> <Button onClick={() => addComment(goal.goalName, goal.comment) } style={{ height: 50, width: 50, backgroundColor: 'white', borderColor: '#2397a8'}}><BsFillChatRightTextFill style={{ color: '#2397a8'}}/></Button> </td>
                </tr>
            )
        }
        else if (goal.goalType.type === 'Workout') {
            return (
                <tr key={ goal.goalName }>
                    <td> { goal.goalName } </td>
                    <td> { goal.description } </td>
                    <td> { goal.comment } </td>
                    <td> { goal.goalType.type } </td>
                    <td> Workouts: { goal.goalType.workouts } </td>
                    <td> { parseDate(goal.deadline) } </td>
                    <td> <Button onClick={() => addComment(goal.goalName, goal.comment) } style={{ height: 50, width: 50, backgroundColor: 'white', borderColor: '#2397a8'}}><BsFillChatRightTextFill style={{ color: '#2397a8'}}/></Button> </td>
                </tr>
            )
        }
    }

    if (client.goalList.length > 0) {
        return (
            <div>
                <Table className='text-center mx-auto' striped bordered hover style={{width: '63vw'}}>
                    <thead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Comment</th>
                        <th scope='col'>Type</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'>Deadline</th>
                        <th scope='col'>Comment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {client.goalList.map(goal => temp(goal))}
                    </tbody>
                </Table>
                <AddCommentModal show={modalCommentShow} onHide={hideSearchModal} username={client.username}
                                 goalName={goalToComment} goalComment={goalComment}/>
            </div>
        )
    }
    else {
        return (
            <div style={{ padding: '25px', textAlign: 'center' }}>
                <h3>No Completed Goals</h3>
            </div>
        )
    }
}