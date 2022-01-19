import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import CreateRoom from './CreateRoom'
import Home from './Home'
import Chat from './Chats'

export default function RoutesHandler({ onCreateRoom, onChatJoined, onJoinRoom, onSendMessage, onMessageReceived, onTyping, onUserTyping, onDismissTyping, onUserDismissTyping }) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home onJoinRoom={onJoinRoom} />} />
                <Route path='/create' element={<CreateRoom onCreateRoom={onCreateRoom} />} />
                <Route
                    path='/chat'
                    element={
                        <Chat
                            noFooter
                            onChatJoined={onChatJoined}
                            onSendMessage={onSendMessage}
                            onMessageReceived={onMessageReceived}
                            onTyping={onTyping}
                            onUserTyping={onUserTyping}
                            onUserDismissTyping={onUserDismissTyping}
                            onDismissTyping={onDismissTyping}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}
