import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatContainer from "./components/Chat/ChatContainer.tsx";
import HomePage from './components/HomePage.tsx';
import LoginPage from './components/LoginPage.tsx';
import RequireAuth from './components/Route/RequireAuth.tsx';

function App() {
  return (
    <ChakraProvider >
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<RequireAuth><HomePage /></RequireAuth>} />
                <Route path="/chat/:id" element={<RequireAuth><ChatContainer /></RequireAuth>} />
            </Routes>
        </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
