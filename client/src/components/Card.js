import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import watchlistVar from '../config/cache'

const Card = (props) => {
  const [hover, setHover] = useState(false)

  const handleAdd = () => {
    if (props.hasOwnProperty('type')) {
      let newEntry = {...props.movie}
      newEntry.type = props.type
      watchlistVar([...watchlistVar(), newEntry])
    }
  }

  const handleDelete = () => {
    if (props.movie.hasOwnProperty('type')) {
      const watchlist = [...watchlistVar()]
      watchlistVar(watchlist.filter(watchlist => watchlist._id !== props.movie._id))
    }
  }
  
  if (hover) {
    return (
      <div className="flex-none flex flex-col justify-around mx-2 my-4 w-48 h-72 bg-gray-800 rounded-lg"
      onMouseLeave={() => setHover(false)}>
        <div>
          <p className="uppercase mx-4 text-xl tracking-widest font-light text-white">{props.movie.title}</p>
          {
            props.movie.tags?.map(tag => {
              return <span className="text-gray-300 text-xs font-light mx-1">{tag}</span>
            })
          }
        </div>
        <div>
          <div>
            { props.movie.hasOwnProperty('type')
              ? <button onClick={handleDelete} className="font-medium mt-4 tracking-widest text-xs text-white bg-red-600 hover:bg-transparent hover:text-red-600 rounded px-4 py-2 uppercase focus:outline-none active:outline-none">
                  Delete from watchlist
                </button>
              : <button onClick={handleAdd} className="font-medium mt-4 tracking-widest text-xs text-white bg-green-600 hover:bg-transparent hover:text-green-600 rounded px-4 py-2 uppercase focus:outline-none active:outline-none">
                  Add to watchlist
                </button>
            }
          </div>
          <Link to={`/${props.movie.hasOwnProperty('type') ? props.movie.type : props.type }/${props.movie._id}`}>
            <button
              className="font-medium mt-4 text-white tracking-widest text-xs bg-yellow-400 hover:bg-transparent hover:text-yellow-400  rounded px-4 py-2 w-auto uppercase focus:outline-none active:outline-none">
              Detail</button>
          </Link>
        </div>
      </div>
    )
  } else {
    return (
      <div
        role="button"
        className="mx-2 my-4 flex-none"
        onMouseEnter={() => setHover(true)}
        >
          <img
            loading="lazy"
            role="button"
            alt="Error Movie Poster Path"
            className="w-48 h-72 rounded-lg text-white"
            src=
            {
              props.movie.poster_path
              ? 'https://image.tmdb.org/t/p/w500/' + props.movie.poster_path
              : 'https://freefrontend.com/assets/img/html-css-404-page-templates/HTML-404-Page-with-SVG.png'
            }
            >
          </img>
      </div>
    )
  }
}

export default Card
