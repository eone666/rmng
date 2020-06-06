import Header from './components/header'
import { short, movies } from './api/videocdn'
import React, { useEffect, useState } from 'react'
import MovieList from './components/movie-list'
import Pagination from './components/pagination'

function App() {

  const [result, setResult] = useState({})
  const [isFetching, setFetchingState] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearch, setSearchState] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const logoClickHandler = () => {
    setSearchState(false)
    setCurrentPage(1)
  }

  const getMovies = () => {

    if (isSearch) {
      short({ title: searchQuery, page: currentPage }).then(result => {
        setFetchingState(false)
        setResult(result)
        setSearchState(true)
      })
    } else {
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

    if (result.result) {

      return <>
        <MovieList data={result.data} />
        <Pagination currentPage={currentPage} pagesCount={result.last_page} onNext={NextBtnHandler} onPrev={PrevBtnHandler}></Pagination>
      </>
    }

  }

  return (
    <div className="App">
      <Header onSearch={searchHandler} onLogoClick={logoClickHandler}></Header>
      {fetchData()}
    </div>
  );
}

export default App;
