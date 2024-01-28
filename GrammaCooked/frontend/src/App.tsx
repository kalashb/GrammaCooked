import {ChakraProvider, Switch} from '@chakra-ui/react'
import LoginPage from './components/LoginPage.tsx'
import AuthPanel from "./components/Auth/AuthPanel";
import {BrowserRouter, Route, Router, Routes, useNavigate} from "react-router-dom";
import AuthenticatedRoute from "./components/Route/RequireAuth.tsx";
import RequireAuth from './components/Route/RequireAuth.tsx';
import HomePage from './components/HomePage.tsx';
import HistoryPanel from './components/History/HistoryPanel.tsx';
import {useState} from "react";
import ChatBot from './components/ChatBot.tsx';

function App() {
    const history = ["lol", "ye", "haha"];
    const [selectedItem, setSelectedItem] = useState<string >("");


  return (
    <ChakraProvider >
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/home" element={<RequireAuth><HomePage /></RequireAuth>} />
                <Route path="/chat" element={<ChatBot />} />
                <Route path='chat/:id' element={<RequireAuth>
                  <HistoryPanel
                      history={history}
                      selectedItem={selectedItem}
                      setSelectedItem={setSelectedItem}
                  /></RequireAuth>}></Route>
            </Routes>
        </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
