import { createTheme } from '@mui/material'

export const theme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			paper: '#161923',
			default: '#181B24',
		},
		text: {
			primary: '#fff',
		},
		primary: { main: '#ff0000' },
		secondary: { main: '#a7a7a7' },
		primary: {
			main: '#bebebe',
		},
	},
})

export default theme
