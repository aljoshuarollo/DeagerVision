import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useRouter } from 'next/router';
import { deleteGoal, completeGoal } from '../services/GoalServices';
import { useState } from "react";
import GoalCompletionModal from "./GoalCompletionModal";
import EditGoalModal from "./EditGoalModal";
import DeadlineModal from "./DeadlineModal";
import { BsClipboard, BsCheckLg, BsFillTrashFill } from "react-icons/bs";

export const parseDate = (deadline) => {
    const dateString = deadline.split("T")[0];
    const dateArray = dateString.split("-");
    return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
}


export default function GoalList ({ username, client, passedDeadlineGoals, priorityGoal }) {

    const router = useRouter();
    // state of goal completion modal
    const [ modalCompleteShow, setModalCompleteShow ] = useState(false);
    // state of edit goal modal
    const [ modalEditShow, setModalEditShow ] = useState(false);
    // the goal name currently selected for editing
    const [ goalToEdit, setGoalToEdit ] = useState('none');
    // the goal description currently selected for editing
    const [ goalDesc, setGoalDesc ] = useState('none');

    // state for showing/hiding deadline modal
    const [deadlineModalShow, setDeadlineModalShow] = useState(passedDeadlineGoals.length > 0);

    // reveal the goal editing modal
    const editDescription = (goalName, goalDesc) => {
        setGoalToEdit(goalName);
        setGoalDesc(goalDesc);
        setModalEditShow(true);
    }

    // complete a goal and reveal a congratulation modal
    const completeThisGoal = (goalName) => {
        const data = {
            username,
            goalName: goalName,
            priorityGoal: client.priorityGoal
        }
        completeGoal(data)
            .then(() => {
                setModalCompleteShow(true);
            })
            .catch(err => console.log(err))
    }

    // hide the goal complete modal
    const modalComplete = () => {
        setModalCompleteShow(false);
        router.reload();
    }

    // hide the edit goal modal
    const modalEdit = (reload) => {
        setModalEditShow(false);
        if (reload) {
            router.reload();
        }
    }

    // delete a goal from the user permanently
    const deleteThisGoal = (goalName) => {
        const data = {
            username,
            goalName: goalName
        }
        deleteGoal(data)
            .then(() => router.reload())
            .catch(err => console.log(err));
    }

    // hide the deadline goal modal
    const hideDeadlineModal = () => {
        setDeadlineModalShow(false);
    }

    // generate the correct table attributes based on the goal type
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
                    <td> <Button onClick={() => editDescription(goal.goalName, goal.description)} variant='primary mx-1' style={{ height: 50, width: 50, backgroundColor: 'white', borderColor: '#2397a8'}}> <BsClipboard style={{ color: '#2397a8'}}/> </Button> </td>
                    <td> <Button onClick={() => completeThisGoal(goal.goalName)} variant='primary mx-1' style={{ height: 50, width: 50, backgroundColor: 'white', borderColor: '#2397a8'}}> <BsCheckLg style={{ color: '#2397a8'}}/> </Button> </td>
                    <td> <Button onClick={() => deleteThisGoal(goal.goalName)} variant='primary mx-1' style={{ height: 50, width: 50, backgroundColor: 'white', borderColor: '#2397a8'}}> <BsFillTrashFill style={{ color: '#2397a8'}}/> </Button> </td>
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
                    <td> <Button onClick={() => editDescription(goal.goalName, goal.description)} variant='primary mx-1' style={{ height: 50, width: 50, backgroundColor: 'white', borderColor: '#2397a8'}}> <BsClipboard style={{ color: '#2397a8'}}/> </Button> </td>
                    <td> <Button onClick={() => completeThisGoal(goal.goalName)} variant='primary mx-1' style={{ height: 50, width: 50, backgroundColor: 'white', borderColor: '#2397a8'}}> <BsCheckLg style={{ color: '#2397a8'}}/> </Button> </td>
                    <td> <Button onClick={() => deleteThisGoal(goal.goalName)} variant='primary mx-1' style={{ height: 50, width: 50, backgroundColor: 'white', borderColor: '#2397a8'}}> <BsFillTrashFill style={{ color: '#2397a8'}}/> </Button> </td>
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
                    <td> <Button onClick={() => editDescription(goal.goalName, goal.description)} variant='primary mx-1' style={{ height: 50, width: 50, backgroundColor: 'white', borderColor: '#2397a8'}}> <BsClipboard style={{ color: '#2397a8'}}/> </Button> </td>
                    <td> <Button onClick={() => completeThisGoal(goal.goalName)} variant='primary mx-1' style={{ height: 50, width: 50, backgroundColor: 'white', borderColor: '#2397a8'}}> <BsCheckLg style={{ color: '#2397a8'}}/> </Button> </td>
                    <td> <Button onClick={() => deleteThisGoal(goal.goalName)} variant='primary mx-1' style={{ height: 50, width: 50, backgroundColor: 'white', borderColor: '#2397a8'}}> <BsFillTrashFill style={{ color: '#2397a8'}}/> </Button> </td>
                </tr>
            )
        }
    };

    if (client.goalList.length > 0) {
        return (
            <div>
                <GoalCompletionModal show={modalCompleteShow} onHide={modalComplete}/>
                <EditGoalModal show={modalEditShow} onHide={modalEdit} username={username} goalName={goalToEdit}
                               goalDesc={goalDesc} deadlineList={ passedDeadlineGoals } priorityGoal={priorityGoal}/>
                <DeadlineModal show={ deadlineModalShow } onHide={ hideDeadlineModal } deadlineList={ passedDeadlineGoals }/>
                <Table className='text-center mx-auto' striped bordered hover style={{width: '63vw'}}>
                    <thead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Comment</th>
                        <th scope='col'>Type</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'>Deadline</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Complete</th>
                        <th scope='col'>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {client.goalList.map(goal => temp(goal))}
                    </tbody>
                </Table>
            </div>
        )
    }
    else {
        return (
            <div style={{ padding: '25px', textAlign: 'center' }}>
                <h3>No Current Goals</h3>
            </div>
        )
    }
}