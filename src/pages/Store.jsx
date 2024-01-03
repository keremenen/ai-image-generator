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
                Add more credits
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Link
                    to='https://buy.stripe.com/dR67tVdMh5dReA05km'
                    target='_blank'
                >
                    <Button
                        variant='outlined'
                        color='warning'
                        fullWidth
                    >
                        1 Credit
                    </Button>
                </Link>
                <Link
                    to='https://buy.stripe.com/aEU6pRbE921FdvWdQQ'
                    target='_blank'
                >
                    <Button
                        variant='outlined'
                        color='warning'
                        fullWidth
                    >
                        10 Credits
                    </Button>
                </Link>
                <Link
                    to='https://buy.stripe.com/cN215x23z8q3eA0001'
                    target='_blank'
                >
                    <Button
                        variant='outlined'
                        color='warning'
                        fullWidth
                    >
                        100 Credits
                    </Button>
                </Link>

                <Button
                    variant='outlined'
                    color='warning'
                    disabled='true'
                    fullWidth
                >
                    Custom amount (not available yet)
                </Button>
            </Box>
        </Container>
    )
}

export default Store
