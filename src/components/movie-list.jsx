import React from 'react'
import MovieItem from './movie-item'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        padding: "20px"
    },
    list: {
        display: "grid",
        gridTemplateColumns: "repeat(10, 5fr);",
        gridGap: "20px",
        listStyle: "none",
        marginBottom: "20px"
    }
}))



export default function MovieList(props) {

    const classes = useStyles()

    const eachData = () => {
        return props.data.map((item) => (
            <MovieItem onMovieClick={props.onMovieClick} key={item.id} data={item} />
        ))
    }

    return (
        <div className={classes.root}>
            <ul className={classes.list}>
                {eachData()}
            </ul>
        </div>
    )
}