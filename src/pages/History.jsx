import {
	Box,
	Container,
	Divider,
	IconButton,
	Paper,
	Typography,
} from '@mui/material'
import useCollection from '../hooks/useCollection'
import { formatDistanceToNow } from 'date-fns'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import styled from '@emotion/styled'
import { useFirestore } from '../hooks/useFirestore'

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

const SingleImageItem = styled(Box)(({ theme }) => ({
	width: '100%',
	transition: 'ease-in-out 200ms',
	cursor: 'pointer',
	'&:hover': {
		transform: 'scale(1.08)',
	},
}))

const History = () => {
	const { data } = useCollection('history')
	const { deleteDocument, response } = useFirestore('history')

	const handleDelete = (id) => {
		deleteDocument(id)
		console.log('Is Penging: ' + response.isPending)
		console.log('Success: ' + response.success)
		console.log('Error: ' + response.error)
		console.log('Document: ' + response.document)
	}

	console.log(data)
	return (
		<Container
			maxWidth={'lg'}
			component={'main'}
		>
			{data &&
				data.map((document) => (
					<Paper
						variant={'outlined'}
						key={document.id}
						square={false}
						sx={{ marginY: 2, padding: 4 }}
					>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-start',
							}}
						>
							<Box>
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
									sx={{ marginTop: 2 }}
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
							</Box>
							<IconButton
								color={'primary'}
								size={'large'}
								aria-label={'delete'}
								onClick={() => {
									handleDelete(document.id)
								}}
							>
								<DeleteForeverIcon />
							</IconButton>
						</Box>

						<Divider sx={{ marginY: 2 }} />
						<Box
							component={'div'}
							sx={{
								display: 'grid',
								gap: '20px',
								gridTemplateColumns: '1fr 1fr 1fr 1fr ',
							}}
						>
							{images &&
								images.map((image) => (
									<SingleImageItem
										component={'img'}
										key={image.id}
										src={image.url}
									/>
								))}
						</Box>
					</Paper>
				))}
		</Container>
	)
}

export default History
