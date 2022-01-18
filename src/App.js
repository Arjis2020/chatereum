import React, { useState, useEffect } from 'react'
import './App.css';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import RoutesHandler from './components/RoutesHandler';
import axios from 'axios';
import Api from './api'
import Loader from './components/Loader';
import { AnimatePresence, motion } from 'framer-motion';
import Socket from './socket'
//require('dotenv').config()

function App() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    async function getToken() {
      try {
        var response = await axios.post(Api.INIT, { token: localStorage.getItem('apiToken') })
        localStorage.setItem('apiToken', response.data.token)
        setToken(response.data.token)
      }
      catch (err) {
        /**
         * @todo
         * handle error by showing a modal or snackbar or something
         */
        console.log(err.toString())
      }
    }
    if (!token)
      getToken()
  }, [token])

  const onCreateRoom = async ({ room_code, room_name, username, room_avatar, onSuccess }) => {
    try {
      var response = await axios.post(Api.ROOM_CREATE, {
        room_code,
        room_name,
        //username,
        room_avatar
      })
      if (response.data.status === 'success') {
        onSuccess({
          navigate: `/chat?room_code=${response.data.room_code}&username=${username}`
        })
      }
    }
    catch (err) {
      console.log(err.toString())
    }
  }

  const onJoinRoom = async ({ room_code, username, onSuccess }) => {
    try {
      var response = await axios.get(`${Api.ROOM_DETAILS}?room_code=${room_code}`)
      if (response.data.status === 'success') {
        const { room } = response.data
        onSuccess({
          navigate: `/chat?room_code=${room.room_code}&username=${username}`
        })
      }
    }
    catch (err) {
      console.log(err.toString())
    }
  }

  const onChatJoined = ({ room_code, username, public_key, onSuccess }) => {
    Socket.init(process.env.REACT_APP_HOST, {
      forceNew: false,
      query: {
        auth: token
      }
    }, () => {
      Socket.emit('join-room', {
        room_code,
        username,
        public_key
      }, (heartbeat) => {
        if (heartbeat.status === 'success') {
          onSuccess({
            sender: 'Server',
            message: 'You joined the room',
            participants: heartbeat.participants
          })
          //localStorage.setItem('chat-room', room_code)
        }
        else {
          /**
           * @TODO
           * Some error handling
           */
        }
      })
      Socket.listen('room-joined', ({ username, participants }) => {
        onSuccess({
          sender: 'Server',
          message: `${username} joined the room`,
          participants
        })
      })
      Socket.listen('user-disconnected', ({ username, participants }) => {
        onSuccess({
          sender: 'Server',
          message: `${username} left the room`,
          participants
        })
      })
    })
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#304fff',
        light: '#7B7CFF',
        dark: '#0026CA',
        contrastText: '#FFF',
        darker: '#020B34'
      },
      secondary: {
        light: '#FFF350',
        main: '#FFC107',
        dark: '#C79100',
        contrastText: '#000000'
      },
      background: {
        default: '#304fff15',
      },
    },
    typography: {
      fontFamily: 'SFProText-Medium',
    },
  })

  return (
    <ThemeProvider
      theme={theme}
    >
      <CssBaseline />
      <AnimatePresence>
        {token ?
          <Container
            maxWidth='xl'
            disableGutters
          >
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0
              }}
              transition={{
                duration: 0.3
              }}
            >
              <RoutesHandler
                onCreateRoom={onCreateRoom}
                onChatJoined={onChatJoined}
                onJoinRoom={onJoinRoom}
              />
            </motion.div>
          </Container >
          :
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 0.3
            }}
          >
            <Loader />
          </motion.div>
        }
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;
