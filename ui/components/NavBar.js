import React from 'react';
import goalStyle from '../styles/Goal.module.css';
import Link from "next/link";
import MUIButton from "./MUIButton";

export default function NavBar({ sendNext, sendPrev, cancel, buttonTitle, underLimit}) {
    return (
        <div className={ goalStyle.nav }>
            <MUIButton onClick={ sendPrev } variant={'contained'} color={'neutral'} title={'back'}/>

            <MUIButton onClick={ cancel } variant={'contained'} color={'cancel'} title={'cancel'}  size={'small'}/>

            <MUIButton onClick={ sendNext } variant={'contained'} color={'primary'} disabled={!underLimit} title={buttonTitle}/>
        </div>
    )
}