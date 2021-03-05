import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { postSeries, getAllSeries } from '../schemas/SERIES'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const AddSeries = props => {
  const [seriesInput, setSeriesInput] = useState({
    title: '',
    overview: '',
    poster_path: '',
    popularity: 0,
    tags: ''
  })
  const toastifyOptions = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  }
  const [arrayOfErrors, setArrayOfErrors] = useState([])

  const [ addSeries ] = useMutation(postSeries, {
    update(cache, { data: { postSeries } }) {
      const existingSeries = cache.readQuery({
        query: getAllSeries
      })
      cache.writeQuery({
        query: getAllSeries,
        data: { ...existingSeries, getAllSeries: [...existingSeries.getAllSeries, postSeries[0] ]}
      })
    },
    onCompleted: () => {
      toast.success(`series added!`, toastifyOptions)
      setTimeout(() => props.setShowModal(false), 1500)
    },
    onError: (error) => {
      console.log(error)
      toast.error('failed to add series!', toastifyOptions)
    }
  })

  const handleChange = e => {
    let { name, value } = e.target
    if (!value) {
      setArrayOfErrors([...arrayOfErrors, name])
    } else {
      setArrayOfErrors(arrayOfErrors.filter(error => error !== name))
    }
    const newSeriesInput = { ...seriesInput, [name]: value }
    setSeriesInput(newSeriesInput)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (arrayOfErrors.length === 0 && Object.keys(seriesInput).every(key => seriesInput[key])) {
      addSeries({
        variables: {
          data: {
            title: seriesInput.title,
            overview: seriesInput.overview,
            poster_path: seriesInput.poster_path,
            popularity: parseFloat(seriesInput.popularity),
            tags: seriesInput.tags.split(' ')
          }
        }
      })
    } else {
      const newSetOfErrors = [...arrayOfErrors]
      Object.keys(seriesInput).forEach(key => {
        if (!seriesInput[key]) {
          newSetOfErrors.push(key)
        }
      })
      setArrayOfErrors(newSetOfErrors)
      toast.error('failed to add series!', toastifyOptions)
    }
  }

  return (
    <>
    <ToastContainer/>
    <form
      onSubmit={handleSubmit}
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5">
            <h3 className="text-2xl font-light text-yellow-400 uppercase">
              add series
            </h3>
          </div>
          <div className="flex-col text-gray-200">
            <div className="flex flex-col mx-10">
              <label className="text-left mr-2 uppercase text-xs py-2 tracking-widest">title</label>
              <input name="title" onChange={handleChange} type="text" className="rounded bg-gray-100 text-gray-600 w-80 text-left font-base text-sm px-2 py-2 focus:outline-none active:outline-none" placeholder="series title"></input>
              { arrayOfErrors.includes('title') ? <span className="text-left text-xs font-light mt-1 tracking-wider text-gray-300">please input title</span> : <span className="text-left text-transparent text-xs font-light mt-1 tracking-wider">asdas</span> }
            </div>
            <div className="flex flex-col mx-10">
              <label className="text-left mr-2 uppercase text-xs py-2 tracking-widest">overview</label>
              <textarea name="overview" onChange={handleChange} className="text-gray-600 bg-gray-100 text-sm rounded w-80 h-20 p-2 focus:outline-none active:outline-none" placeholder="series overview"></textarea>
              { arrayOfErrors.includes('overview') ? <span className="text-left text-xs font-light mt-1 tracking-wider text-gray-300">please input overview</span> : <span className="text-left text-transparent text-xs font-light mt-1 tracking-wider">asdas</span> }
            </div>
            <div className="flex flex-col mx-10">
              <label className="text-left mr-2 uppercase text-xs py-2 tracking-widest">poster path</label>
              <input name="poster_path" onChange={handleChange} type="text" className="rounded bg-gray-100 text-gray-600 focus:outline-none active:outline-none w-80 text-left font-base text-sm px-2 py-2" placeholder="series poster path"></input>
              { arrayOfErrors.includes('poster_path') ? <span className="text-left text-xs font-light mt-1 tracking-wider text-gray-300">please input poster path</span> : <span className="text-left text-transparent text-xs font-light mt-1 tracking-wider">asdas</span> }
            </div>
            <div className="flex flex-col mx-10">
              <label className="text-left mr-2 uppercase text-xs py-2 tracking-widest">popularity</label>
              <input name="popularity" onChange={handleChange} min="0" step="0.1" type="number" className="rounded bg-gray-100 text-gray-600 focus:outline-none active:outline-none w-80 text-left font-base text-sm px-2 py-2" placeholder="0"></input>
              { arrayOfErrors.includes('popularity') ? <span className="text-left text-xs font-light mt-1 tracking-wider text-gray-300">please input popularity</span> : <span className="text-left text-transparent text-xs font-light mt-1 tracking-wider">asdas</span> }
            </div>
            <div className="flex flex-col mx-10">
              <label className="text-left mr-2 uppercase text-xs py-2 tracking-widest">tags</label>
              <input name="tags" onChange={handleChange} type="text" className="rounded text-gray-600 bg-gray-100 focus:outline-none active:outline-none w-80 text-left font-base text-sm px-2 py-2" placeholder="series tags"></input>
              { arrayOfErrors.includes('tags') ? <span className="text-left text-xs font-light mt-1 tracking-wider text-gray-300">please input tags</span> : <span className="text-left text-transparent text-xs font-light mt-1 tracking-wider">asdas</span> }
            </div>
          </div>
          <div className="flex items-center justify-end my-6 mx-10">
            <button
              className="text-yellow-400 tracking-wider font-light uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={() => props.setShowModal(false)}
            >
              Close
            </button>
            <button
              className="bg-yellow-400 uppercase text-sm px-6 py-1 rounded focus:outline-none mr-1 mb-1"
              type="submit"
              style={{ transition: "all .15s ease" }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </form>
    <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
  </>
  )
}

export default AddSeries
