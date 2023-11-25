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

const Navbar = () => {
	const { logout } = useLogout()
	const { user } = useAuthContext()

	const handleLogout = (e) => {
		logout()
	}

	return (
		<AppBar
			position={'static'}
			sx={{ marginBottom: '40px', background: theme.palette.background.paper }}
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
				<Typography>Hello, {user.displayName}</Typography>
				<Box
					component='ul'
					sx={{ display: 'flex', alignItems: 'center', gap: 3 }}
				>
					<Link to={'/history'}>
						<Button>History</Button>
					</Link>
					<Button disabled>Settings</Button>

					<IconButton onClick={handleLogout}>
						<LogoutIcon />
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
