import { useState } from 'react'
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import useAuthContext from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState('')
    const { dispatch } = useAuthContext()

    const login = (email, password) => {
        setError(null)

        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                dispatch({ type: 'LOGIN', payload: response.user })
            })
            .catch((error) => {
                console.dir(error)
                setError(`Błąd: niepoprawny email lub hasło`)
            })
    }

    return { login, error }
}

export default useLogin
