import {
	Alert,
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
	}

	return (
		<Container
			maxWidth={'lg'}
			component={'main'}
		>
			<Alert severity={'info'}>
				The url addresses of images created with Dall-E are available for
				approximately 1 hour. <br />
				After this time, they will be deleted and will not be available even
				from the profile history.
			</Alert>
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
								display: 'flex',
								justifyContent: 'space-between',
								flexWrap: 'wrap',
							}}
						>
							{document.images &&
								document.images.map((image) => (
									<SingleImageItem
										sx={{ maxWidth: '180px' }}
										component={'img'}
										src={image.url}
										key={image.id}
									/>
								))}
						</Box>
					</Paper>
				))}
		</Container>
	)
}

export default History
