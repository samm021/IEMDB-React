import React, { useState, useEffect } from 'react'
import { Loading, DetailCard, Errors } from '../exporter'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { getMovie } from '../schemas/MOVIES'
import { getSeries } from '../schemas/SERIES'

const Detail = () => {
  const history = useHistory()
  const { type, id } = useParams()
  const { data, loading, error } = useQuery(type == 'tv' ? getSeries : getMovie, {
    variables: {
      id
    }
  })

  if (loading) {
    return (
      <div className="bg-gray-900 w-11/12">
        <Loading/>
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
      <div className="h-auto flex flex-col justify-between pt-5">
        <button className="self-start flex focus:outline-none" onClick={() => history.goBack()}>
          <div className="ml-6 mt-1 text-yellow-400 font-light text-xl">
            <span>← </span>
          </div>
          <div className="ml-2 mt-2 text-yellow-400 font-light text-xl tracking-widest uppercase">
            <span>Back</span>
          </div>
        </button>
      </div>
      <DetailCard detailData={type === 'tv' ? data.getSeries[0] : data.getMovie[0]} key={type === 'tv' ? data.getSeries[0]._id : data.getMovie[0]._id}/>
      </div>
    )
  }
}

export default Detail
