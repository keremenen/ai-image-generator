import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputAdornment from '@mui/material/InputAdornment'
import MailOutlinedIcon from '@mui/icons-material/MailOutlined'
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined'
import { useTheme } from '@mui/material'
import { useState } from 'react'
import useLogin from '../hooks/useLogin'

const Login = () => {
	const theme = useTheme()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { login, error } = useLogin()

	const handleLogin = (e) => {
		e.preventDefault()
		login(email, password)
	}

	return (
		<Container
			component={'main'}
			maxWidth={'sm'}
			sx={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<Box
				px={5}
				py={7}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					background: theme.palette.background.paper,
					borderRadius: '25px',
				}}
			>
				<Typography
					mb={3}
					textAlign={'center'}
					variant={'h4'}
					component={'h1'}
				>
					LOGIN
				</Typography>
				<Divider />
				<Box
					component={'form'}
					onSubmit={handleLogin}
					mt={2}
				>
					<TextField
						margin={'normal'}
						label={'Email'}
						variant={'outlined'}
						fullWidth
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						InputProps={{
							sx: {
								borderRadius: 4,
							},
							endAdornment: (
								<InputAdornment position='end'>
									<MailOutlinedIcon />
								</InputAdornment>
							),
						}}
					/>
					<TextField
						margin={'normal'}
						label={'Password'}
						variant={'outlined'}
						type={'password'}
						fullWidth
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						sx={{ borderRadius: '40' }}
						InputProps={{
							sx: {
								borderRadius: 4,
							},
							endAdornment: (
								<InputAdornment position='end'>
									<HttpsOutlinedIcon />
								</InputAdornment>
							),
						}}
					/>
					<Typography
						align={'right'}
						variant={'subtitle2'}
					>
						Fogot password?
					</Typography>
					<Box
						mt={4}
						gap={2}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Button
							size={'large'}
							type={'submit'}
							color={'info'}
							variant={'contained'}
							sx={{
								width: '70%',
							}}
						>
							Login
						</Button>
						{error && <Typography>{error}</Typography>}
						<Typography>Dont have an account?</Typography>
						<Button
							size={'large'}
							color={'success'}
							variant={'outlined'}
							sx={{
								width: '70%',
							}}
						>
							Sign up
						</Button>
					</Box>
				</Box>
			</Box>
		</Container>
	)
}

export default Login
