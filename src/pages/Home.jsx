import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const images = [
	{
		id: 1,
		url: 'https://img.freepik.com/premium-photo/mountain-lake-with-mountain-background_901003-24960.jpg',
	},
	{
		id: 2,
		url: 'https://img.freepik.com/premium-photo/mountain-lake-with-mountain-background_901003-24960.jpg',
	},
	{
		id: 3,
		url: 'https://img.freepik.com/premium-photo/mountain-lake-with-mountain-background_901003-24960.jpg',
	},
	{
		id: 4,
		url: 'https://img.freepik.com/premium-photo/mountain-lake-with-mountain-background_901003-24960.jpg',
	},
	{
		id: 5,
		url: 'https://img.freepik.com/premium-photo/mountain-lake-with-mountain-background_901003-24960.jpg',
	},
	{
		id: 6,
		url: 'https://img.freepik.com/premium-photo/mountain-lake-with-mountain-background_901003-24960.jpg',
	},
	{
		id: 7,
		url: 'https://img.freepik.com/premium-photo/mountain-lake-with-mountain-background_901003-24960.jpg',
	},
	{
		id: 8,
		url: 'https://img.freepik.com/premium-photo/mountain-lake-with-mountain-background_901003-24960.jpg',
	},
]

const Home = () => {
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
					variant={'outlined'}
					label={'Type what you want to generate'}
					fullWidth
					helperText={
						'Be very detailed in your prompt description. Remember to specify background, art style, camera angles etc.'
					}
					size={'normal'}
				/>
				<Tooltip title='It will generate 9 images with a given prompt'>
					<Button
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
					variant={'h4'}
					sx={{ textAlign: 'center' }}
				>
					Enjoy ;)
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
