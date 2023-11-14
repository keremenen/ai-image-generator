import { createContext, useReducer } from 'react'

export const AuthContext = createContext({})

const authReducer = (state, action) => {
	switch (action.type) {
		case 'SIGNUP':
			return { ...state, user: action.payload }
		case 'LOGIN':
			return { ...state, user: action.payload }
		default:
			return state
	}
}

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
		isAuthReady: false,
	})

	console.dir(state)
	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	)
}
