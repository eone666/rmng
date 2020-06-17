import Header from './components/header'
import { short, movies } from './api/videocdn'
import React, { useEffect, useState } from 'react'
import MovieList from './components/movie-list'
import Pagination from './components/pagination'
import MovieBackdrop from './components/movie-backdrop'
import Player from './components/player'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: "50px"
  }
}))

function App() {

  const classes = useStyles()

  const [result, setResult] = useState({})
  const [isFetching, setFetchingState] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearch, setSearchState] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [backdropIsOpened, setBackdropState] = useState(false)
  const [iframeSrc, setIframeSrc] = useState('')

  const logoClickHandler = () => {
    setSearchState(false)
    setCurrentPage(0)
  }

  const getMovies = () => {

    if (isSearch) {
      short({ title: searchQuery, page: currentPage }).then(result => {
        setFetchingState(false)
        setResult(result)
        setSearchState(true)
      })
    } else {
      if (currentPage === 0) {
        setCurrentPage(1)
      }
      movies({ page: currentPage }).then(result => {
        setFetchingState(false)
        setResult(result)
      }).catch(error => {
        setError(error)
      })
    }

  }

  useEffect(() => {
    setSearchState(false)
    getMovies()
    // eslint-disable-next-line
  }, [currentPage])

  const handleMovieClick = (playerSrc) => {
    setBackdropState(true)
    setIframeSrc(playerSrc)
  }

  const handleCloseBackdrop = () => {
    setBackdropState(false)
    setIframeSrc('')
  }

  const searchHandler = (query) => {
    setSearchState(true)
    setSearchQuery(query)
    short({ title: query }).then(result => {
      setFetchingState(false)
      setResult(result)
    })
  }

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

    if (result.data) {

      return <>
        <MovieList data={result.data} onMovieClick={handleMovieClick} />
        <Pagination currentPage={currentPage} pagesCount={result.last_page} onNext={NextBtnHandler} onPrev={PrevBtnHandler}></Pagination>

      </>
    } else {
      return <div className="not-found">Ничего не найдено</div>
    }

  }

  return (
    <div className={classes.root}>
      <Header onSearch={searchHandler} onLogoClick={logoClickHandler}></Header>
      {fetchData()}
      <MovieBackdrop opened={backdropIsOpened} onClose={handleCloseBackdrop}><Player iframeSrc={iframeSrc} /></MovieBackdrop>
    </div>
  );
}

export default App;
