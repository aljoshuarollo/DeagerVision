import styles from '../styles/Home.module.css';
import Head from 'next/head';
import profileStyles from '../styles/Profile.module.css';
import Image from 'next/image';
import PriorityGoal from './PriorityGoal';

export default function ProfileHeader ({ user, imgRef, userType, show, goal }) {
    let display;
    
    if (userType !== 'Trainer') {
        display = <h5> Trainer: { user.trainer } </h5>
    }

    return (
        <div className={ profileStyles.container }>
            <Head>
                <title>{ user.name }'s Profile</title>
            </Head>
            <h1 className={ styles.title }>
                { user.name }
            </h1>
            <div className={ profileStyles.leftSide }>
                <div className={ profileStyles.header }>
                    <div className={ profileStyles.image }>
                        <Image
                            src={ imgRef }
                            alt='Profile picture'
                            layout='fixed'
                            width={ 150 }
                            height={ 150 }
                        />
                    </div>
                    <div className={ profileStyles.userName }>
                        <h2>{ user.username }</h2>
                        { display }
                    </div>
                </div>
                <div>
                    <PriorityGoal show={ show } goal={ goal }/>
                </div>
            </div>
        </div>
    )
}