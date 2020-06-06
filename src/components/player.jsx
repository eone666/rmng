import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%"
    }
}))

export default function Player() {
    const classes = useStyles()
    return (
        <>
            <iframe src={props.iframeSrc} frameborder="0"></iframe>
        </>
    )
}