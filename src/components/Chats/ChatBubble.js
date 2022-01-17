import { Avatar, Box, Divider, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import './chatbubble.css'

export default function ChatBubble({ sender, message, timestamp, className }) {
    //const [img, setImg] = useState('')

    const randomInRange = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /* useEffect(() => {
        if (!img)
            setImg(`https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/${randomInRange(0, 100)}.png`)
    }, []) */

    const randomMsg = () => {
        const lorem = 'Voluptate nisi minim officia Lorem. Velit occaecat ipsum enim irure velit magna dolore ullamco non aute. Nulla nulla deserunt ex fugiat ullamco ad. Ea Lorem duis excepteur irure minim pariatur occaecat sunt deserunt mollit qui qui dolore aliqua. Excepteur eu eu id est ut commodo do qui sunt tempor nostrud id labore eu. Irure aute eiusmod non nisi veniam occaecat laborum fugiat est dolore aute. Ex aute incididunt velit laboris non exercitation nulla nisi ut dolor.'

        return lorem.substring(randomInRange(0, 5), randomInRange(5, 250))
    }

    return (
        <Box>
            <div className={`talk-bubble ${className ? 'tri-right' : null} round btm-left ${className ? 'mb-3' : null}`}>
                <Stack
                    spacing={0.5}
                    className='talktext'
                >
                    <Stack
                        direction='row'
                        spacing={1}
                        alignItems='center'
                    >
                        {/* <Avatar
                            src={img}
                        /> */}
                        <Typography>
                            {sender}
                        </Typography>
                    </Stack>
                    <Divider light />
                    <Typography
                        variant='body2'
                        fontFamily='SFProText-Regular'
                    >
                        {message}
                        {randomMsg()}
                    </Typography>
                    <Typography
                        variant='body2'
                        fontFamily='SFProText-Regular'
                        textAlign='end'
                    >
                        Sent at {moment(timestamp).format("hh:mm A")}
                    </Typography>
                </Stack>
            </div>
        </Box>
    )
}
