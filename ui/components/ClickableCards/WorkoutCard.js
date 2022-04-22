import Card from 'react-bootstrap/Card';
import goalStyle from "../../styles/Goal.module.css";

export default function WorkoutCard({ onClick, active }) {

    return (
        <Card onClick={ onClick } style={ { cursor: 'pointer', width: '15rem', margin: '10px', scale: active.scale, borderColor: active.borderColor, boxShadow: active.boxShadow} } className={ goalStyle.card }>
            <img
                style={ { height: '180px', width: '100%', display: 'block' } }
                src={ '/flexed-biceps.png' }
                alt='100%x180'
            />
            <Card.Body>
                <h4>Workout</h4>

                <p/>

                <ul>
                    <li>
                        Number of workouts
                    </li>
                </ul>

            </Card.Body>
        </Card>
    )
}