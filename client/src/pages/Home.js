import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Loading, Errors, Card } from '../exporter'
import { getEntertainMe } from '../schemas/ENTERTAINME'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'


const Home = () => {
  const { data, loading, error} = useQuery(getEntertainMe, {
    fetchPolicy: 'no-cache'
  })

  const onWheelTop = e => {
    const container = document.getElementById('container-one')
    const containerScrollPosition = document.getElementById('container-one').scrollLeft
    container.scrollTo({
        top: 0,
        left: containerScrollPosition + e.deltaY,
        behaviour: 'smooth'
    })
  }

  const onWheelBottom = e => {
    const container = document.getElementById('container-two')
    const containerScrollPosition = document.getElementById('container-two').scrollLeft
    container.scrollTo({
        top: 0,
        left: containerScrollPosition + e.deltaY,
        behaviour: 'smooth'
    })
  }

  if (loading) {
    return (
      <div className="bg-gray-900 w-11/12">
        <div className="mx-auto"><Loading/></div>
      </div>
    )
  } else if (error) {
    return (
      <div className="bg-gray-900 w-11/12">
        <div className="mx-auto"><Errors/></div>
      </div>
    )
  } else {
    return (
      <div className="bg-gray-900 w-11/12 flex flex-col">
        <div className="h-1/2 flex flex-col ml-4 pt-2">
          <div className="ml-2 mt-1 text-left text-yellow-400 font-light text-xl tracking-widest uppercase">
            <Link to="/movies">Movies</Link>
          </div>
          <PerfectScrollbar
          id="container-one"
          onWheel={onWheelTop}
          className="flex flex-row">
            {
              data.entertainme.movies.length === 0
              ? <div className="mx-auto self-center"><span className="text-yellow-500 uppercase tracking-widest font-extralight text-5xl">No Movie Entries</span></div>
              : data.entertainme.movies?.map(movie => {
                return <Card key={movie._id} movie={movie} type={'movies'} />
              })
            }
          </PerfectScrollbar>
        </div>
        <div className="h-1/2 flex flex-col ml-4 pt-2">
          <div className="ml-2 text-left mt-1 text-yellow-400 font-light text-xl tracking-widest uppercase">
            <Link to="/tv">Series</Link>
          </div>
          <PerfectScrollbar 
          id="container-two"
          onWheel={onWheelBottom}
          className="flex flex-row">
          {
            data.entertainme.series.length === 0
            ? <div className="mx-auto self-center"><span className="text-yellow-500 uppercase tracking-widest font-extralight text-5xl">No TV Series Entries</span></div>
            : data.entertainme.series?.map(movie => {
              return <Card key={movie._id} movie={movie} type={'tv'} />
            })
          }
          </PerfectScrollbar>
        </div>
      </div>
    )
  }

}

export default Home
