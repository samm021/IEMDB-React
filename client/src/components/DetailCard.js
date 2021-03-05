import React, { useState } from 'react'
import { EditModal } from '../exporter'
import { useParams, useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { deleteMovie, getMovies } from '../schemas/MOVIES'
import { deleteSeries, getAllSeries } from '../schemas/SERIES'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const DetailCard = props => {
  const { type, id } = useParams()
  const history = useHistory()
  const [showModal, setShowModal] = useState(false)
  const toastifyOptions = {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  }

  const [ deleteEntry ] = useMutation(type === 'tv' ? deleteSeries : deleteMovie, {
    update(cache) {
      const entryQuery = type === 'tv' ? getAllSeries : getMovies
      const existingEntries = cache.readQuery({
        query: entryQuery
      })
      if (Object.keys(existingEntries)[0] === 'getAllSeries') {
        cache.writeQuery({
          query: getAllSeries,
          data: { ...existingEntries, getAllSeries: [...existingEntries.getAllSeries].filter(series => series._id !== id)}
        })
      } else {
        cache.writeQuery({
          query: getMovies,
          data: { ...existingEntries, getMovies: [...existingEntries.getMovies].filter(movie => movie._id !== id)}
        })
      }
    },
    onCompleted: () => {
      toast.error(`entry deleted!`, toastifyOptions)
      setTimeout(() => history.goBack(), 1500)
    },
    onError: (error) => {
      console.log(error)
      toast.dark('entry deletion failed!', toastifyOptions)
    }
  })

  const handleDelete = () => {
    deleteEntry({
      variables: {
        id
      }
    })
  }

  return (
    <PerfectScrollbar className="container-sm mx-auto pt-0 pb-4">
    <div className="flex justify-center rounded-lg mt-10">
        <img
          loading="lazy"
          className="h-auto w-auto rounded-l-lg"
          src={props.detailData?.poster_path ? 'https://image.tmdb.org/t/p/w500/'+ props.detailData?.poster_path : 'https://freefrontend.com/assets/img/html-css-404-page-templates/HTML-404-Page-with-SVG.png'} alt="Sunset in the mountains"
        ></img>
        <div className="p-5 bg-gray-800 w-1/2 rounded-lg shadow-lg rounded-l-none">
          <p className="mt-20 mx-40 uppercase text-4xl font-light text-yellow-400 text-center tracking-wider">{props.detailData?.title}</p>
          <div className="px-8 pt-2 pb-6 mb-2 flex flex-col justify-center items-center">
            <div className="flex flex-row justify-center mt-4 mb-5">
              {
                props.detailData?.tags?.map(tag => {
                  return <span className="text-gray-300 text-sm font-light mx-4">{tag}</span>
                })
              }
            </div>
            <div className="mt-12 h-auto self-center mx-16 whitespace-pre-line">
              <p className="text-gray-200 font-light text-left mx-2 tracking-wide leading-relaxed">{props.detailData?.overview}</p>
            </div>
            <div className="mt-16 mr-6 flex justify-center">
              <div className="flex justify-start">
                <span className="text-yellow-300 font-light text-sm tracking-wide mr-4 uppercase">popularity:  </span>
                <div className="w-2/12">
                  <CircularProgressbar value={props.detailData?.popularity} maxValue={10} text={`${props.detailData?.popularity}`} styles={buildStyles({
                    textColor: '#ffff',
                    pathColor: `rgb(46,139,87)`,
                  })} />
                </div>
              </div>
              <div className="flex flex-col mt-1">
                <button onClick={() => setShowModal(true)} className="bg-green-500 hover:text-green-500 hover:bg-transparent focus:outline-none text-gray-100 rounded py-1 px-6 tracking-wider uppercase text-xs mb-2">edit</button>
                <button onClick={handleDelete} className="bg-red-500 hover:text-red-500 hover:bg-transparent focus:outline-none text-gray-100 rounded py-1 px-6 tracking-wider uppercase text-xs mb-2">delete</button>
              </div>
            </div>

          </div>
        </div>
    </div>
    {showModal ? (
        <EditModal setShowModal={setShowModal} key={props.detailData._id} data={props.detailData}/>
      ) : null}
    <ToastContainer/>
  </PerfectScrollbar>
  )
}

export default DetailCard
