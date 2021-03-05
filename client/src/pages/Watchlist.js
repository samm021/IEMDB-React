import React from 'react'
import { useQuery } from '@apollo/client'
import { getWatchlist } from '../schemas/WATCHLIST'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Loading, Errors, Card, Empty } from '../exporter'

const Watchlist = () => {
  const { data, loading, error } = useQuery(getWatchlist)

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
      <div className="h-auto flex flex-row justify-between pt-5">
        <div className="ml-6 mt-2 text-yellow-400 font-light text-xl tracking-widest uppercase">
          <span>Watchlist</span>
        </div>
      </div>
        <PerfectScrollbar
          className="flex w-auto container-lg justify-start flex-row flex-wrap mx-14 mt-5">
            {
              data.watchlist.length === 0
              ? <div className="mx-auto"><Empty/></div>
              : data.watchlist?.map(movie => {
                return <Card key={movie._id} movie={movie} type={movie.type}/>
              })
            }
        </PerfectScrollbar>
    </div>
    )
  }
}

export default Watchlist
