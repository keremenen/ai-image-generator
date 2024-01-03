import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import useLogout from '../hooks/useLogout'
import useAuthContext from '../hooks/useAuthContext'
import theme from '../themes/theme'
import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import { IconButton } from '@mui/material'
import useDocument from '../hooks/useDocument'

const Navbar = () => {
    //Import funkcji logout z hooka useLogout
    const { logout } = useLogout()

    // Pobranie obiektu reprezentującego obecnie zalogowanego użytkownika
    const { user } = useAuthContext()

    // Pobranie dokumentu z firestore przedstawiającego obecnie zalogowanego użytklownika, jeśli nie istnieje to zwraca null

    const { document } = user
        ? useDocument('users', user.uid)
        : { document: null, error: null }

    // Funkcja uruchamiana po wciśnięciu buttona logout
    const handleLogout = (e) => {
        logout()
    }

    return (
        <AppBar
            position={'static'}
            sx={{
                marginBottom: '40px',
                background: theme.palette.background.paper,
            }}
        >
            <Toolbar
                component={'nav'}
                sx={{ justifyContent: 'space-between' }}
            >
                <Link to={'/'}>
                    <Typography
                        variant={'h6'}
                        color={'primary'}
                    >
                        AI IMAGE GENERATOR
                    </Typography>
                </Link>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        fontSize={'14px'}
                        color={'gray'}
                    >
                        Witaj, {user.displayName}
                    </Typography>
                    {document && (
                        <Typography>Kredyty: {document.credits}</Typography>
                    )}
                </Box>
                <Box
                    component='ul'
                    sx={{ display: 'flex', alignItems: 'center', gap: 3 }}
                >
                    <Link to={'/store'}>
                        <Button>Doładuj kredyty</Button>
                    </Link>
                    <Link to={'/history'}>
                        <Button>Historia</Button>
                    </Link>
                    <IconButton onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
