import { signOut } from 'firebase/auth'

import { auth } from '../firebase/config'
import useAuthContext from './useAuthContext'

export const useLogout = () => {
	const { dispatch } = useAuthContext()

	const logout = () => {
		signOut(auth)
			.then(() => {
				dispatch({ type: 'LOGOUT' })
			})
			.catch((error) => console.log(error.message))
	}
	return { logout }
}

export default useLogout
