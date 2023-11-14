import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { ThemeProvider } from '@mui/material'
import theme from './themes/theme'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import useAuthContext from './hooks/useAuthContext'

function App() {
	const { user, isAuthReady } = useAuthContext()

	return (
		<>
			{isAuthReady && (
				<ThemeProvider theme={theme}>
					<BrowserRouter>
						<Routes>
							<Route
								path={'/'}
								element={
									user ? (
										<>
											<Navbar />
											<Home />
											<Footer />
										</>
									) : (
										<Navigate to={'/login'} />
									)
								}
							/>
							<Route
								path={'/login'}
								element={user ? <Navigate to={'/'} /> : <Login />}
							/>
							<Route
								path={'/signup'}
								element={<Signup />}
							/>
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			)}
		</>
	)
}

export default App
