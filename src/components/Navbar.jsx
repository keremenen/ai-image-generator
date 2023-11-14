import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import useLogout from '../hooks/useLogout'
import useAuthContext from '../hooks/useAuthContext'

const Navbar = () => {
	const { logout } = useLogout()
	const { user } = useAuthContext()

	const handleLogout = (e) => {
		logout()
	}

	return (
		<AppBar
			position={'static'}
			sx={{ marginBottom: '40px' }}
		>
			<Toolbar
				component={'nav'}
				sx={{ justifyContent: 'space-between' }}
			>
				<Typography variant={'h6'}>AI IMAGE GENERATOR</Typography>
				<Typography>Hello, {user.email}</Typography>
				<Box
					component='ul'
					sx={{ display: 'flex', alignItems: 'center', gap: 3 }}
				>
					<Button>History</Button>

					<Button disabled>Settings</Button>

					<Button
						variant={'contained'}
						onClick={handleLogout}
					>
						Logout
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default Navbar
