import Container from '@mui/material/Container'
import GenerateForm from '../components/GenerateForm'

const Home = () => {
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
