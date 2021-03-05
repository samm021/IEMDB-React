import React from 'react'
import Lottie from 'react-lottie'
import * as errors from '../assets/Lottie/error.json'

const defaultOption = {
  loop: true,
  autoplay: true,
  animationData: errors.default,
  renderedSettings: {
    preserveAspectRation: 'xMidYmid slice'
  }
}

const Errors = () => {
  return (
    <div>
      <Lottie options={defaultOption} height={700} width={700} ></Lottie>
    </div>
  )
}

export default Errors
