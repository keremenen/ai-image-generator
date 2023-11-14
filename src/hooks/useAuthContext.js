import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const useAuthContext = () => {
	const context = useContext(AuthContext)

	if (!context) {
		throw new Error('Context must be used inside Provider')
	}

	return context
}

export default useAuthContext
