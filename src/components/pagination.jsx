import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "space-around"
    }
}))

export default function Pagination(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Button color="primary" variant="contained" disabled={props.currentPage > 1 ? false : true} onClick={props.onPrev}>← Назад</Button>
            <Button color="primary" variant="contained" disabled={props.currentPage < props.pagesCount ? false : true} onClick={props.onNext}>Вперед →</Button>
        </div>
    )
}