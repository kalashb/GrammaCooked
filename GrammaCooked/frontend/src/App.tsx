import {ChakraProvider, Switch} from '@chakra-ui/react'
import LoginPage from './components/LoginPage.tsx'
import AuthPanel from "./components/Auth/AuthPanel";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import AuthenticatedRoute from "./components/Route/RequireAuth.tsx";
import RequireAuth from './components/Route/RequireAuth.tsx';
import HomePage from './components/HomePage.tsx';
import ChatBot from './components/ChatBot.tsx';

function App() {
  return (
    <ChakraProvider >
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<RequireAuth><HomePage /></RequireAuth>} />
                <Route path="/chat" element={<ChatBot />} />
            </Routes>
        </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
