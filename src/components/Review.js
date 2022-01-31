import { Box, Card, CardContent, Link, Rating, Stack, TextField, Typography } from '@mui/material'
import Bubbles from './Home/Bubbles'
import { Chat, Lock, Person, Send } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Footer from './Footer'
import Model from './Home/Model'
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Api from '../api'

export default function Review() {

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    const [isLoading, setLoading] = useState(false)

    const handleRatingChange = (event, newValue) => {
        setRating(newValue)
    }

    const uploadRating = async () => {
        try{
            setLoading(true)
            var response = await axios.post(Api.RATING, {
                rating,
                review,
                username: searchParams.get('username')
            })
            if(response.data.status === 'success'){
                setLoading(false)
                navigate('/')
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <Box
            sx={{
                overflow: {
                    xs: 'auto',
                    md: 'hidden'
                }
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    zIndex: -1,
                    left: 0,
                    right: 0,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Bubbles />
            </Box>
            <Stack
                spacing={1}
                alignItems='center'
                sx={{
                    margin: {
                        xs: 2,
                        md: 'none'
                    }
                }}
            >
                <Model />
                <Card
                    sx={{
                        minWidth: 'xs',
                        borderRadius: 2,
                    }}
                    raised
                >
                    <CardContent>
                        <Stack
                            direction='column'
                            alignItems='center'
                            spacing={3}
                            padding={2}
                        >
                            <Stack
                                spacing={1}
                                alignItems='center'
                            >
                                <Typography
                                    variant='h4'
                                >
                                    How was your experience?
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='GrayText'
                                    fontFamily='SFProText-Regular'
                                    maxWidth={350}
                                >
                                    Please rate your experience out of 5
                                </Typography>
                            </Stack>
                            <Rating
                                name="customized-color"
                                defaultValue={0}
                                value={rating}
                                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                onChange={handleRatingChange}
                                precision={1}
                                icon={<FavoriteIcon fontSize='large' />}
                                emptyIcon={<FavoriteBorderIcon fontSize="large" />}
                                sx={{
                                    '& .MuiRating-iconFilled': {
                                        color: (theme) => theme.palette.primary.main,
                                    },
                                    '& .MuiRating-iconHover': {
                                        color: (theme) => theme.palette.primary.main,
                                    }
                                }}
                            />
                            {
                                rating > 0 &&
                                <motion.div
                                    initial={{
                                        x: 200
                                    }}
                                    animate={{
                                        x: 0
                                    }}
                                    style={{
                                        width: '100%'
                                    }}
                                >
                                    <TextField
                                        label='Write a review'
                                        placeholder='Write a short review...'
                                        /*value={username}
                                        onChange={handleUsernameChange}*/
                                        multiline
                                        rows={7}
                                        maxRows={8}
                                        type='text'
                                        inputProps={{
                                            maxLength: 500
                                        }}
                                        InputProps={{
                                            /* endAdornment: (
                                                <Chat color='primary' />
                                            ) */
                                        }}
                                        fullWidth
                                    />
                                </motion.div>
                            }
                            <LoadingButton
                                variant='contained'
                                startIcon={<Send />}
                                fullWidth
                                size='large'
                                loading={isLoading}
                                onClick={uploadRating}
                                disabled={rating === 0}
                            >
                                Submit review
                            </LoadingButton>
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>
        </Box>
    )
}
