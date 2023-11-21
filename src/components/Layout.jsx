import { Box } from '@mui/material'
import theme from '../themes/theme'

export const Layout = ({ children }) => {
	return (
		<Box
			sx={{
				background: theme.palette.background.default,
				minHeight: '100vh',
				position: 'relative',
				paddingBottom: 12,
			}}
		>
			{children}
		</Box>
	)
}

export default Layout
