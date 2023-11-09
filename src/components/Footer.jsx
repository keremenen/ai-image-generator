import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const currentYear = new Date().getFullYear()
const Footer = () => {
	return (
		<Box
			component={'footer'}
			position={'absolute'}
			sx={{ width: '100%', bottom: 0, borderTop: '1px solid #313131' }}
			py={2}
		>
			<Container>
				<Typography
					component={'p'}
					variant={'overline'}
					align={'center'}
				>
					Copyright by Przemysław Kitowski / {currentYear}
				</Typography>
			</Container>
		</Box>
	)
}

export default Footer
