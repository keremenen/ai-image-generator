import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { ThemeProvider } from '@mui/material'
import theme from './themes/theme'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<Routes>
						<Route
							path={'/'}
							element={
								<>
									<Navbar />
									<Home />
									<Footer />
								</>
							}
						/>
						<Route
							path={'/login'}
							element={<Login />}
						/>
						<Route
							path={'/signup'}
							element={<Signup />}
						/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</>
	)
}

export default App
