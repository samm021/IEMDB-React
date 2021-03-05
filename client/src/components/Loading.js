import React from 'react'
import Lottie from 'react-lottie'
import * as loading from '../assets/Lottie/loading.json'

const defaultOption = {
  loop: true,
  autoplay: true,
  animationData: loading.default,
  renderedSettings: {
    preserveAspectRation: 'xMidYmid slice'
  }
}

const Loading = () => {
  return (
    <>
      <Lottie options={defaultOption} height={700} width={700} ></Lottie>
    </>
  )
}

export default Loading
