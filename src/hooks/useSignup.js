import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../firebase/config'
import useAuthContext from './useAuthContext'
import { useFirestore } from './useFirestore'

export const useSignup = () => {
    const { addDocument, response } = useFirestore('users')
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
            await updateProfile(response.user, { displayName })
            await updateProfile(response.user, { credits: 10 })

            addDocument(
                {
                    displayName: response.user.displayName,
                    uid: response.user.uid,
                    credits: 10,
                },
                response.user.uid
            )

            dispatch({ type: 'SIGNUP', payload: response.user })

            // updateProfile(auth, { displayName })
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    setError('Niepoprawny adres email')
                    break
                case 'auth/email-already-in-use':
                    setError('Podany email jest już zarejestrowany')
                    break
                case 'auth/missing-email':
                    setError('Nie podano adresu email')
                    break
                case 'auth/missing-password':
                    setError('Nie podano hasła')
                    break
                case 'auth/weak-password':
                    setError('Podane hasło jest za krótkie (min. 6 znaków)')
                    break
                default:
                    setError('Błąd formularza, sprawdź poprawność danych')
                    break
            }
        }
    }

    return { signUp, error }
}

export default useSignup
