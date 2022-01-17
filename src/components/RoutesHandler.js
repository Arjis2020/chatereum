import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import CreateRoom from './CreateRoom'
import Home from './Home'
import Chat from './Chats'

export default function RoutesHandler({onCreateRoom, onJoinRoom}) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/create' element={<CreateRoom onCreateRoom={onCreateRoom}/>} />
                <Route path='/chat' element={<Chat noFooter onJoinRoom={onJoinRoom}/>} />
            </Routes>
        </BrowserRouter>
    )
}
