import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateRoom from './CreateRoom'
import Home from './Home'
import Chat from './Chats'

export default function RoutesHandler() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/create' element={<CreateRoom />} />
                <Route path='/chat' element={<Chat noFooter />} />
            </Routes>
        </BrowserRouter>
    )
}
