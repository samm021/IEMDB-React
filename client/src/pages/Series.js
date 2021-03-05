import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Loading, Errors, Card, AddSeries, Empty } from '../exporter'
import { getAllSeries } from '../schemas/SERIES'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

const Series = () => {
  const { data, loading, error } = useQuery(getAllSeries)
  const [showModal, setShowModal] = useState(false)

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
            <span>Series</span>
          </div>
          <button 
          onClick={() => setShowModal(true)}
          className="mr-4 mt-2 bg-yellow-400 focus:bg-yellow-500 font-normal uppercase text-xs px-2 py-1 tracking-wider rounded focus:outline-none active:outline-none">
            <span>add series</span>
          </button>
        </div>
        <PerfectScrollbar
        className="flex container-lg mx-14 justify-start flex-row flex-wrap mt-5">
          {
            data.getAllSeries?.length === 0
            ? <div className="mx-auto"><Empty/></div>
            : data.getAllSeries?.map(series => {
              return <Card key={series._id} movie={series} type={'tv'}/>
            })
          }
        </PerfectScrollbar>
        {showModal ? (
        <AddSeries setShowModal={setShowModal}/>
      ) : null}
      </div>
    )
  }
  

}

export default Series

