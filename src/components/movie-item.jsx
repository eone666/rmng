import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { find } from '../api/tmdb'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
    root: {
        cursor: "pointer"
    },
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
            return <Skeleton variant="rect" animation="pulse" width={150} height={250} />
        }

        if (error) {
            return <div>{error.message}</div>
        }

        if (result) {


            const FILE_PATH = () => {
                if (result.movie_results.length) {
                    return BASE_URL + FILE_SIZE + '/' + result.movie_results[0].poster_path
                }
                else if (result.tv_results.length) {
                    return BASE_URL + FILE_SIZE + '/' + result.tv_results[0].poster_path
                }
                else {
                    return 'https://via.placeholder.com/150x220/eee'
                }
            }

            return <><img className={classes.img} src={FILE_PATH()} alt="" /></>
        }

    }

    const handleMovieClick = () => {
        props.onMovieClick(props.data.iframe_src)
    }

    const classes = useStyles()

    return (
        <li className={classes.root} onClick={handleMovieClick}>

            {getPosterImage()}
            <Typography color="textPrimary" align="center">{props.data.ru_title || props.data.title}</Typography>

        </li >
    )
}