import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import useDalle from '../hooks/useDalle'
import { MagicSpinner } from 'react-spinners-kit'
import { Alert, AlertTitle, Divider, useTheme } from '@mui/material'

const Home = () => {
	const [prompt, setPrompt] = useState('')
	const theme = useTheme()
	const { generateImages, response } = useDalle()

	const handleSubmit = async (e) => {
		e.preventDefault()
		generateImages(prompt)
	}

	return (
		<Container
			component={'main'}
			maxWidth={'lg'}
		>
			<Box
				my={10}
				component={'form'}
				sx={{
					display: 'flex',
					alignItems: 'flex-start',
					gap: '20px',
					wordWrap: 'nowrap',
				}}
			>
				<TextField
					id='prompt'
					value={prompt}
					variant={'outlined'}
					onChange={(e) => setPrompt(e.target.value)}
					label={'Type what you want to generate'}
					fullWidth
					helperText={
						'Be very detailed in your prompt description. Remember to specify background, art style, camera angles etc.'
					}
					size={'normal'}
				/>
				<Tooltip title='It will generate 9 images with a given prompt'>
					<Button
						onClick={handleSubmit}
						size={'large'}
						variant={'outlined'}
						color={'success'}
					>
						Generate
					</Button>
				</Tooltip>
				<Tooltip title={'It will generate 9 images with a random prompt'}>
					<Button
						size={'large'}
						variant='outlined'
						color='warning'
					>
						Randomize
					</Button>
				</Tooltip>
			</Box>
			{response.isLoading && (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<MagicSpinner
						// size={30}
						color={theme.palette.primary.main}
						loading={response.isLoading}
					/>
				</Box>
			)}

			{response.error && (
				<Box>
					<Alert severity='error'>
						<AlertTitle>Error</AlertTitle>
						{response.error}
					</Alert>
				</Box>
			)}

			{response.success && (
				<>
					<Divider />
					<Box mt={4}>
						<Typography
							variant={'h5'}
							sx={{ textAlign: 'center' }}
						>
							Generated images:
						</Typography>
						<Grid
							container
							columnSpacing={2}
							justifyContent={'space-around'}
						>
							{response.images &&
								response.images.map((image) => (
									<Grid
										item
										xs={2}
										sx={{ height: 260 }}
										key={image.id}
									>
										<Box
											component={'img'}
											key={image.id}
											src={image.url}
											alt=''
											sx={{
												objectFit: 'contain',
												width: '100%',
												height: '100%',
											}}
										/>
									</Grid>
								))}
						</Grid>
					</Box>
				</>
			)}
		</Container>
	)
}

export default Home
