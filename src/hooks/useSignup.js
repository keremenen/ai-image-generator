import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../firebase/config'

export const useSignup = () => {
	const [error, setError] = useState(null)

	const signUp = (email, password) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((response) => {
				console.log(`Signed up! Response: ${response.user}`)
			})
			.catch((error) => {
				setError(error.message)
			})
	}

	return { signUp, error }
}

export default useSignup
