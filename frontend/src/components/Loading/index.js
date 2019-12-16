import React from 'react';
import Lottie from 'react-lottie';

import animationData from '~/assets/loading.json';

export default function Loading() {
  const options = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return <Lottie options={options} height={64} width={64} />;
}
