import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: "calc(100% - 100px)",
        height: "calc(100% - 120px)"
    }
}))

export default function Player(props) {
    const classes = useStyles()
    return (
        <iframe className={classes.root} title="qq" src={props.iframeSrc} allowFullScreen="true " frameBorder="0"></iframe>
    )
}