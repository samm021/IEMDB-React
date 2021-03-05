import React from 'react'
import Lottie from 'react-lottie'
import * as empty from '../assets/Lottie/empty.json'

const defaultOption = {
  loop: true,
  autoplay: true,
  animationData: empty.default,
  renderedSettings: {
    preserveAspectRation: 'xMidYmid slice'
  }
}

const Empty = () => {
  return (
    <div>
      <Lottie options={defaultOption} height={700} width={700} ></Lottie>
    </div>
  )
}

export default Empty
