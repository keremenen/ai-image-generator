import { Box } from '@mui/material'
import theme from '../themes/theme'

export const Layout = ({ children }) => {
	return (
		<Box
			sx={{
				background: theme.palette.background.default,
				minHeight: '100vh',
				position: 'relative',
			}}
		>
			{children}
		</Box>
	)
}

export default Layout
