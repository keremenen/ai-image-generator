import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { MagicSpinner } from 'react-spinners-kit'
import FsLightbox from 'fslightbox-react'
import { useState } from 'react'
import useDalle from '../hooks/useDalle'
import { useTheme } from '@mui/material'
import { createPortal } from 'react-dom'

export const GenerateForm = () => {
	const theme = useTheme()
	const { generateImages, response } = useDalle()
	const [lightboxOpen, setLightboxOpen] = useState(false)
	const [prompt, setPrompt] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()
		generateImages(prompt)
	}

	console.log(response)

	return (
		<>
			<Box
				my={10}
				component={'form'}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '20px',
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
					size={'small'}
				/>
				<Tooltip title='It will generate 9 images with a given prompt'>
					<Button
						onClick={handleSubmit}
						size={'normal'}
						variant={'outlined'}
						color={'success'}
					>
						Generate
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
							{response.images && (
								<>
									{response.images.map((image) => (
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
												onClick={() => setLightboxOpen(!lightboxOpen)}
												alt=''
												sx={{
													objectFit: 'contain',
													width: '100%',
													height: '100%',
												}}
											/>
										</Grid>
									))}
									{createPortal(
										<>
											<FsLightbox
												toggler={lightboxOpen}
												type={'image'}
												types={['image', 'image', 'image', 'image', 'image']}
												sources={response.images.map((image) => image.url)}
											/>
										</>,
										document.body
									)}
								</>
							)}
						</Grid>
					</Box>
				</>
			)}
		</>
	)
}

export default GenerateForm
