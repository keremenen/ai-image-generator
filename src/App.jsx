import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './themes/theme'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import useAuthContext from './hooks/useAuthContext'
import History from './pages/History'
import Layout from './components/Layout'

function App() {
	const { user, isAuthReady } = useAuthContext()

	return (
		<>
			{isAuthReady && (
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<BrowserRouter>
						<Layout>
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
								<Route
									path={'/history'}
									element={
										user ? (
											<>
												<Navbar />
												<History />
												<Footer />
											</>
										) : (
											<Navigate to={'/'} />
										)
									}
								/>
							</Routes>
						</Layout> 
					</BrowserRouter>
				</ThemeProvider>
			)}
		</>
	)
}

export default App
