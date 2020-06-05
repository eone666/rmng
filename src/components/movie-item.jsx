import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { find } from '../api/tmdb'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
    img: {
        width: "100%"
    },
    link: {
        textDecoration: "none"
    }
}))

export default function MovieItem(props) {

    const [result, setResult] = useState({})
    const [isFetching, setFetchingState] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        find(props.data.imdb_id, {
            language: "ru_RU",
            external_source: "imdb_id"
        }).then(result => {
            setResult(result)
        })
            .then(() => {
                setFetchingState(false)
            })
            .catch(error => {
                setError(error)
            })
    }, [props.data.imdb_id])

    const getPosterImage = () => {

        const BASE_URL = "https://image.tmdb.org/t/p/"
        const FILE_SIZE = "w200"

        if (isFetching) {
            return <Skeleton variant="rect" width={150} height={250} />
        }

        if (error) {
            return <div>{error.message}</div>
        }

        if (result) {

            const FILE_PATH = () => (
                result.movie_results[0].poster_path
            )

            return <><img className={classes.img} src={BASE_URL + FILE_SIZE + '/' + FILE_PATH()} alt="" /></>
        }

    }

    const classes = useStyles()

    return (
        <li>
            <a className={classes.link} href={props.data.iframe_src}>
                {getPosterImage()}
                <Typography color="textPrimary" align="center">{props.data.ru_title}</Typography>
            </a>
        </li >
    )
}