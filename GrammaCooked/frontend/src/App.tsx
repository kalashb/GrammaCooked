import { ChakraProvider } from '@chakra-ui/react'
import HomePage from './components/HomePage'
import ChatBot from './components/ChatBot'

function App() {

  return (
    <ChakraProvider >
      <HomePage />
      <ChatBot />
    </ChakraProvider>
  )
}

export default App
