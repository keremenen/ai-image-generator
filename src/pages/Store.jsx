import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Store = () => {
    return (
        <Container
            component={'main'}
            maxWidth={'sm'}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Typography
                mb={3}
                textAlign={'center'}
                variant={'h5'}
                component={'h1'}
            >
                Doładuj kredyty
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Link
                    to='https://buy.stripe.com/7sIcOfdMh6hV1NefZ2'
                    target='_blank'
                >
                    <Button
                        variant='outlined'
                        color='success'
                        fullWidth
                    >
                        1 Kredyt
                    </Button>
                </Link>
                <Link
                    to='https://buy.stripe.com/aEU6pRbE921FdvWdQQ'
                    target='_blank'
                >
                    <Button
                        variant='outlined'
                        color='success'
                        fullWidth
                    >
                        10 Kredytów
                    </Button>
                </Link>
                <Link
                    to='https://buy.stripe.com/cN215x23z8q3eA0001'
                    target='_blank'
                >
                    <Button
                        variant='outlined'
                        color='success'
                        fullWidth
                    >
                        100 Kredytów
                    </Button>
                </Link>

                <Button
                    variant='outlined'
                    color='warning'
                    disabled='true'
                    fullWidth
                >
                    Własna ilość (niedostępne)
                </Button>
            </Box>
        </Container>
    )
}

export default Store
