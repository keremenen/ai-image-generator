import { Box, Container, Divider, Typography } from '@mui/material'
import useCollection from '../hooks/useCollection'

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

const History = () => {
	const { data } = useCollection('history')

	return (
		<Container
			maxWidth={'lg'}
			component={'main'}
		>
			<Typography color={'primary'}>elo</Typography>
			{data &&
				data.map((document) => (
					<Box>
						<span>Search phrase:</span>
						{document.doc}
						<p>Date:</p>
						<Divider />
						<Box
							component={'div'}
							sx={{
								display: 'grid',
								gap: '20px',
								gridTemplateColumns: '1fr 1fr 1fr 1fr',
							}}
						>
							{images &&
								images.map((image) => (
									<Box
										component={'img'}
										key={image.key}
										src={image.url}
										sx={{ width: '100%' }}
									/>
								))}
						</Box>
					</Box>
				))}
		</Container>
	)
}

export default History
