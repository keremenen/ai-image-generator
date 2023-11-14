import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import useLogout from '../hooks/useLogout'

const Navbar = () => {
	const { logout } = useLogout()

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
