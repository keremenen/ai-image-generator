import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../firebase/config'
import useAuthContext from './useAuthContext'

export const useSignup = () => {
	const [error, setError] = useState(null)
	const { dispatch } = useAuthContext()

	const signUp = async (displayName, email, password) => {
		setError(null)
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			updateProfile(response.user, { displayName })
			dispatch({ type: 'SIGNUP', payload: response.user })

			updateProfile(auth, { displayName })
		} catch (error) {
			setError(error.message)
		}
	}

	return { signUp, error }
}

export default useSignup
