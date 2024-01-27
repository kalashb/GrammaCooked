import { ChakraProvider } from '@chakra-ui/react'
import HomePage from './components/HomePage'
import React from 'react'

function App() {

  return (
    <ChakraProvider >
      <HomePage />
    </ChakraProvider>
  )
}

export default App
