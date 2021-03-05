import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { putMovie, getMovie } from '../schemas/MOVIES'
import { putSeries, getSeries } from '../schemas/SERIES'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditModal = props => {
  const { type, id } = useParams()
  const [editInput, setEditInput] = useState({
    title: props.data.title,
    overview: props.data.overview,
    poster_path: props.data.poster_path,
    popularity: +props.data.popularity,
    tags: props.data.tags.join(' ')
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

  const [putEntry] = useMutation(type === 'tv' ? putSeries : putMovie, {
    refetchQueries: [{ query: type === 'tv' ? getSeries : getMovie, variables: {id}}],
    onCompleted: () => {
      toast.success(`entry updated!`, toastifyOptions)
      props.setShowModal(false)
    },
    onError: (error) => {
      console.log(error)
      toast.error('entry updation failed!', toastifyOptions)
    }
  })

 

  const handleUpdate = e => {
    e.preventDefault()
    if (arrayOfErrors.length === 0) {
      putEntry({
        variables: {
          id,
          data: {
            title: editInput.title,
            overview: editInput.overview,
            poster_path: editInput.poster_path,
            popularity: parseFloat(editInput.popularity),
            tags: editInput.tags.split(' ')
          }
        }
      })
    } else {
      toast.error('entry updation failed!', toastifyOptions)
    }
  }

  const handleChange = e => {
    let { name, value } = e.target
    if (!value) {
      setArrayOfErrors([...arrayOfErrors, name])
    } else {
      setArrayOfErrors(arrayOfErrors.filter(error => error !== name))
    }
    const newEditInput = { ...editInput, [name]: value }
    setEditInput(newEditInput)
  }

  return (
    <>
    <form
      onSubmit={(e) => handleUpdate(e)}
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-800 outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5">
            <h3 className="text-2xl font-light text-yellow-400 uppercase">
              Edit
            </h3>
          </div>
          <div className="flex-col text-gray-200">
            <div className="flex flex-col mx-10">
              <label className="text-left mr-2 uppercase text-xs py-2 tracking-widest">title</label>
              <input name="title" onChange={handleChange} value={editInput.title} type="text" className="rounded text-gray-600 bg-gray-100 w-80 text-left text-sm px-2 py-2 focus:outline-none active:outline-none"></input>
             { arrayOfErrors.includes('title') ? <span className="text-left text-xs font-light mt-1 tracking-wider text-gray-300">please input title</span> : <span className="text-left text-transparent text-xs font-light mt-1 tracking-wider">asdas</span> }
            </div>
            <div className="flex flex-col mx-10">
              <label className="text-left mr-2 uppercase text-xs py-2 tracking-widest">overview</label>
              <textarea name="overview" onChange={handleChange} value={editInput.overview} className="text-gray-600 text-sm bg-gray-100 rounded w-80 h-20 p-2 focus:outline-none active:outline-none"></textarea>
              { arrayOfErrors.includes('overview') ? <span className="text-left text-xs font-light mt-1 tracking-wider text-gray-300">please input overview</span> : <span className="text-left text-transparent text-xs font-light mt-1 tracking-wider">asdas</span> }
            </div>
            <div className="flex flex-col mx-10">
              <label className="text-left mr-2 uppercase text-xs py-2 tracking-widest">poster path</label>
              <input name="poster_path" onChange={handleChange} value={editInput.poster_path} type="text" className="rounded text-gray-600 bg-gray-100 focus:outline-none active:outline-none w-80 text-left font-base text-sm px-2 py-2"></input>
              { arrayOfErrors.includes('poster_path') ? <span className="text-left text-xs font-light mt-1 tracking-wider text-gray-300">please input title</span> : <span className="text-left text-transparent text-xs font-light mt-1 tracking-wider">asdas</span> }
            </div>
            <div className="flex flex-col mx-10">
              <label className="text-left mr-2 uppercase text-xs py-2 tracking-widest">popularity</label>
              <input name="popularity" onChange={handleChange} value={editInput.popularity} min="0" max="10" step="0.1" type="number" className="rounded text-gray-600 bg-gray-100 focus:outline-none active:outline-none w-80 text-left font-base text-sm px-2 py-2"></input>
              { arrayOfErrors.includes('popularity') ? <span className="text-left text-xs font-light mt-1 tracking-wider text-gray-300">please input popularity</span> : <span className="text-left text-transparent text-xs font-light mt-1 tracking-wider">asdas</span> }
            </div>
            <div className="flex flex-col mx-10">
              <label className="text-left mr-2 uppercase text-xs py-2 tracking-widest">tags</label>
              <input name="tags" onChange={handleChange} type="text" value={editInput.tags} className="rounded text-gray-600 bg-gray-100 focus:outline-none active:outline-none w-80 text-left font-base text-sm px-2 py-2"></input>
              { arrayOfErrors.includes('tags') ? <span className="text-left text-xs font-light mt-1 tracking-wider text-gray-300">please input tags</span> : <span className="text-left text-transparent text-xs font-light mt-1 tracking-wider">asdas</span> }
            </div>
          </div>
          <div className="flex items-center justify-end my-6 mx-10">
            <button
              className="text-red-400 tracking-wider font-light uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              style={{ transition: "all .15s ease" }}
              onClick={() => props.setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 focus:bg-green-600 text-gray-100 uppercase text-sm px-6 py-1 rounded focus:outline-none mr-1 mb-1"
              type="submit"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </form>
    <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
  </>
  )
}

export default EditModal

