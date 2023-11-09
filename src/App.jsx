import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { ThemeProvider } from '@mui/material'
import theme from './themes/theme'
import Footer from './components/Footer'

function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Navbar />
					<Routes>
						<Route
							path={'/'}
							element={<Home />}
						/>
					</Routes>
					<Footer />
				</BrowserRouter>
			</ThemeProvider>
		</>
	)
}

export default App
