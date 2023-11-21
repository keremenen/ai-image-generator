import { Box, Container, Divider, Paper, Typography } from '@mui/material'
import useCollection from '../hooks/useCollection'
import { formatDistanceToNow } from 'date-fns'

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
	// console.log(data[0].createdAt.toDateString())
	return (
		<Container
			maxWidth={'lg'}
			component={'main'}
		>
			{data &&
				data.map((document) => (
					<Paper
						variant={'outlined'}
						square={false}
						elevation={1}
						sx={{ marginY: 2, padding: 4 }}
					>
						<Typography
							color={'secondary'}
							variant={'body2'}
							fontWeight={300}
						>
							Search phrase:
						</Typography>
						<Typography
							color={'primary'}
							fontWeight={900}
							fontSize={18}
						>
							{document.prompt}
						</Typography>
						<Typography
							sx={{ marginTop: 2, marginBottom: 2 }}
							color={'secondary'}
							fontWeight={300}
							variant={'body2'}
							component={'p'}
						>
							Created:{' '}
							<Typography
								component={'span'}
								fontWeight={500}
							>
								{formatDistanceToNow(document.createdAt.toDate(), {
									addSuffix: true,
								})}
							</Typography>
						</Typography>
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
					</Paper>
				))}
		</Container>
	)
}

export default History
