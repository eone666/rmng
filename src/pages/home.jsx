import React, { useEffect, useState } from 'react'
import { movies } from '../api/videocdn'
import MovieList from '../components/movie-list'
import Pagination from '../components/pagination'

export default function HomePage() {

    const [result, setResult] = useState({})
    const [isFetching, setFetchingState] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)



    useEffect(() => {
        movies({ page: currentPage }).then(result => {
            setFetchingState(false)
            setResult(result)
        }).catch(error => {
            setError(error)
        })
    }, [currentPage])

    const NextBtnHandler = () => {
        setCurrentPage(currentPage + 1)
    }

    const PrevBtnHandler = () => {
        setCurrentPage(currentPage - 1)
    }

    const fetchData = () => {

        if (isFetching) {
            return <></>
        }

        if (error) {
            return <div>{error.message}</div>
        }

        if (result.result && result.last_page) {

            return <>
                <MovieList data={result.data} />
                <Pagination currentPage={currentPage} pagesCount={result.last_page} onNext={NextBtnHandler} onPrev={PrevBtnHandler}></Pagination>
            </>
        }

    }

    return (
        <>
            {fetchData()}

        </>
    )
}