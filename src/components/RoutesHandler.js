import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import CreateRoom from './CreateRoom'
import Home from './Home'
import Chat from './Chats'
import Review from './Review'

export default function RoutesHandler({
    onCreateRoom,
    onChatJoined,
    onJoinRoom,
    onSendMessage,
    onSendFile,
    onMessageReceived,
    onFileReceived,
    onTyping,
    onUserTyping,
    onDismissTyping,
    onUserDismissTyping,
    onLeaveRoom
}) {
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
                            onSendFile={onSendFile}
                            onMessageReceived={onMessageReceived}
                            onFileReceived={onFileReceived}
                            onTyping={onTyping}
                            onUserTyping={onUserTyping}
                            onUserDismissTyping={onUserDismissTyping}
                            onDismissTyping={onDismissTyping}
                            onLeaveRoom={onLeaveRoom}
                        />
                    }
                />
                <Route 
                    path='/review'
                    element={
                        <Review />
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}
