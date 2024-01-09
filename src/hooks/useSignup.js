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
            console.log(error.message)
            setError('Błąd: Sprawdź wszystkie dane w formularzu')
        }
    }

    return { signUp, error }
}

export default useSignup
