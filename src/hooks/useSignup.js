import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../firebase/config'
import useAuthContext from './useAuthContext'

export const useSignup = () => {
	const [error, setError] = useState(null)
	const { dispatch } = useAuthContext()

	const signUp = (email, password) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((response) => {
				dispatch({ type: 'SIGNUP', payload: response.user })
				console.log(`Signed up! Response: ${response.user}`)
			})
			.catch((error) => {
				setError(error.message)
			})
	}

	return { signUp, error }
}

export default useSignup
