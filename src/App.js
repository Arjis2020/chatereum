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
import Encryption from './encryption'

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
    }, (socket) => {
      Socket.emit('join-room', {
        room_code,
        username,
        public_key
      }, (heartbeat) => {
        if (heartbeat.status === 'success') {
          onSuccess({
            sender: 'Server',
            message: 'You joined the room',
            participants: heartbeat.participants.filter(item => item.socket_id !== socket.id),
            size: heartbeat.size
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
      Socket.listen('room-joined', ({ username, participants, size }) => {
        onSuccess({
          sender: 'Server',
          message: `${username} joined the room`,
          participants: participants.filter(item => item.socket_id !== socket.id),
          size
        })
      })
      Socket.listen('user-disconnected', ({ username, participants, size }) => {
        onSuccess({
          sender: 'Server',
          message: `${username} left the room`,
          participants: participants.filter(item => item.socket_id !== socket.id),
          size
        })
      })
    })
  }

  const onSendMessage = async (message, participants) => {
    for await (const { socket_id, public_key } of participants) {
      const encrypted = await Encryption.encrypt(public_key, message)
      //this encrypted object will be the payload for individual users
      console.log("ENCRYPTED ", encrypted)
      Socket.emit('private-message', {
        to: socket_id,
        encrypted
      })
      /* const decrypted = await Encryption.decrypt(encrypted.aes_key, encrypted.iv, keys.private_key, encrypted.cipher_text)
      console.log("DECRYPTED ", decrypted) */
    }
  }

  const onMessageReceived = ({ callback }) => {
    Socket.listen('new-private-message', async ({ encrypted, from, timestamp }) => {
      const decrypted = await Encryption.decrypt(encrypted.aes_key, encrypted.iv, sessionStorage.getItem('private_key'), encrypted.cipher_text)
      console.log("DECRYPTED ", decrypted)
      callback({
        sender: from,
        message: decrypted,
        timestamp
      })
    })
  }

  const onTyping = (room_code) => {
    Socket.emit('typing', { room_code })
  }

  const onDismissTyping = (room_code) => {
    Socket.emit('dismiss-typing', { room_code })
  }

  const onUserTyping = ({ callback }) => {
    Socket.listen('user-typing', ({ username }) => {
      callback({
        username
      })
    })
  }

  const onUserDismissTyping = ({ callback }) => {
    Socket.listen('user-dismiss-typing', () => {
      callback()
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
        glow: '#FFFB00',
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
                onSendMessage={onSendMessage}
                onMessageReceived={onMessageReceived}
                onTyping={onTyping}
                onUserTyping={onUserTyping}
                onDismissTyping={onDismissTyping}
                onUserDismissTyping={onUserDismissTyping}
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
