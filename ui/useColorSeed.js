import React from "react"

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array
}

export const getLightColor = (x) => {
  switch (x) {
    case 0: {
      return "text-rose-200"
    }
    case 1: {
      return "text-amber-200"
    }
    case 2: {
      return "text-green-200"
    }
    case 3: {
      return "text-fuchsia-200"
    }
    case 4: {
      return "text-lightBlue-200"
    }
    case 5: {
      return "text-gray-200"
    }
    case 6: {
      return "text-orange-200"
    }
  }
}

export const getDarkColor = (x) => {
  switch (x) {
    case 0: {
      return "text-rose-400"
    }
    case 1: {
      return "text-amber-400"
    }
    case 2: {
      return "text-green-400"
    }
    case 3: {
      return "text-fuchsia-400"
    }
    case 4: {
      return "text-lightBlue-400"
    }
    case 5: {
      return "text-gray-400"
    }
    case 6: {
      return "text-orange-400"
    }
  }
}

export const useColorSeed = () => {
  const [seed, setSeed] = React.useState([])

  React.useEffect(() => {
    setSeed(shuffleArray([0, 1, 2, 3, 4, 5, 6]))
  }, [])

  return seed
}
