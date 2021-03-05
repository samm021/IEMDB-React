import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'

const Navbar = () => {
  return (
    <div className="bg-gray-800 w-1/12 flex flex-col sticky">
      <div className="mt-20">
        <Link to="/">
          <img src={logo} alt="Logo" className="px-2 py-0 w-auto"></img>
        </Link>
      </div>
      <div className="mt-20 flex-none flex flex-col items-center">
        <Link to="/">
          <span className="text-white text-xs tracking-widest font-light uppercase">all</span>
        </Link>
        <Link to="/movies" className="mt-5">
          <span className="text-white text-xs tracking-widest font-light uppercase">movies</span>
        </Link>
        <Link to="/tv" className="mt-5">
          <span className="text-white text-xs tracking-widest font-light uppercase">series</span>
        </Link>
        <Link to="/watchlist" className="mt-5">
          <span className="text-white text-xs tracking-widest font-light uppercase">watchlist</span>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
