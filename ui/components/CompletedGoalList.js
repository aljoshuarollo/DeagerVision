import Table from 'react-bootstrap/Table';

export default function CompletedGoalList ({ client }) {

    const temp = (goal) => {
        if (goal.goalType.type === 'Food') {
            return (
                <tr key={ goal.goalName }>
                    <td> { goal.goalName } </td>
                    <td> { goal.description } </td>
                    <td> { goal.comment } </td>
                    <td> { goal.goalType.type } </td>
                    <td> Calories: { goal.goalType.calories } </td>
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
                </tr>
            )
        }
    }

    if (client.completedGoals.length > 0) {
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
                    </tr>
                    </thead>
                    <tbody>
                    {client.completedGoals.map(goal => temp(goal))}
                    </tbody>
                </Table>
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