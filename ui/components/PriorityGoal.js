import Card from 'react-bootstrap/Card';
import { BsFillExclamationCircleFill } from "react-icons/bs";
import profileStyles from '../styles/Profile.module.css';


export const parseDate = (deadline) => {
    const dateString = deadline.split("T")[0];
    const dateArray = dateString.split("-");
    return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`
}

export default function PriorityGoal ({ show, goal }) {
    if (show) {
        return (
            <div className={ profileStyles.priority }>
                <Card style={{ cursor: 'pointer', width: '320px', minWidth: '320px', minHeight: '170px'}}>
                    <Card.Header style={{ textAlign: 'center' }}>
                        <h4>Priority Goal <BsFillExclamationCircleFill /> </h4>
                    </Card.Header>
                    <Card.Body>
                        <b>Name</b>: { goal.goalName }
                        <hr/>
                        <b>Deadline</b>: { parseDate(goal.deadline) }
                    </Card.Body>
                </Card>
            </div>
        )
    }
    else {
        return (
            <div/>
        )
    }
}