import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'

const Home = () => {
	const [prompt, setPrompt] = useState('')
	const [images, setImages] = useState([])

	console.log(import.meta.env.VITE_DALLE_API_KEY)
	const imageGenerator = async () => {
		if (!prompt) return
		try {
			const response = await fetch(
				'https://api.openai.com/v1/images/generations ',
				{
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
						Authorization: `Bearer ${import.meta.env.VITE_DALLE_API_KEY}`,
					},
					body: JSON.stringify({
						prompt: `${prompt}`,
						n: 1,
						model: 'dall-e-3',
						size: '1024x1024',
					}),
				}
			)

			const data = await response.json()
			setImages(data.data)

			const imagesToAdd = data.data.map((image) => ({
				url: image.url,
				id: Math.floor(Math.random() * 1_000_000),
			}))

			//Adding images to firebase history
			addDocument({
				prompt,
				images: imagesToAdd,
			})
		} catch (error) {
			console.log(`error: ${error}`)
		}
	}

	const { addDocument, response } = useFirestore('history')

	const handleSubmit = async (e) => {
		e.preventDefault()
		imageGenerator()
	}

	useEffect(() => {
		console.log(images)
	}, [images])
	return (
		<Container
			component={'main'}
			maxWidth={'lg'}
		>
			<Box
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
			<Box mt={8}>
				<Typography
					mb={4}
					variant={'h5'}
					sx={{ textAlign: 'center' }}
				>
					Generated images:
				</Typography>
				<Grid
					container
					rowSpacing={4}
					columnSpacing={4}
				>
					{images &&
						images.map((image) => (
							<Grid
								item
								xs={3}
								sx={{ height: 240 }}
								key={image.id}
							>
								<Box
									component={'img'}
									key={image.id}
									src={image.url}
									alt=''
									sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
								/>
							</Grid>
						))}
				</Grid>
			</Box>
		</Container>
	)
}

export default Home
