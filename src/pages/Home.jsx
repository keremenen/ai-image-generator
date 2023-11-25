import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import useDalle from '../hooks/useDalle'
import { MagicSpinner } from 'react-spinners-kit'
import { Alert, AlertTitle, Divider, useTheme } from '@mui/material'
import { createPortal } from 'react-dom'
import FsLightbox from 'fslightbox-react'
import GenerateForm from '../components/GenerateForm'

const Home = () => {
	const [prompt, setPrompt] = useState('')
	const theme = useTheme()
	const { generateImages, response } = useDalle()
	const [lightboxOpen, setLightboxOpen] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		generateImages(prompt)
	}

	return (
		<Container
			component={'main'}
			maxWidth={'lg'}
		>
			<GenerateForm />
		</Container>
	)
}

export default Home
