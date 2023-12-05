import { useReducer, useState, useEffect } from 'react'
import { useFirestore } from './useFirestore'

import useAuthContext from './useAuthContext'
import { timestamp } from '../firebase/config'

const initialState = {
	isLoading: false,
	error: false,
	images: null,
	success: false,
}

const dalleReducer = (state, action) => {
	switch (action.type) {
		case 'IS_LOADING':
			return {
				...state,
				isLoading: true,
				error: null,
				images: null,
				success: false,
			}
		case 'IMAGES_GENERATED_SUCCESSFULLY':
			return {
				...state,
				isLoading: false,
				error: null,
				images: action.payload,
				success: true,
			}
		case 'ERROR':
			return {
				...state,
				isLoading: false,
				error: action.payload,
				images: null,
				success: false,
			}
		default:
			return state
	}
}

export const useDalle = () => {
	const { user } = useAuthContext()
	const [response, dispatch] = useReducer(dalleReducer, initialState)
	const [isCancelled, setIsCancelled] = useState(false)

	const { addDocument } = useFirestore('history')

	const generateImages = async (prompt) => {
		if (!prompt) return
		dispatch({ type: 'IS_LOADING' })

		try {
			// const response = await fetch(
			// 	'https://api.openai.com/v1/images/generations ',
			// 	{
			// 		method: 'POST',
			// 		headers: {
			// 			'Content-type': 'application/json',
			// 			Authorization: `Bearer ${import.meta.env.VITE_DALLE_API_KEY}`,
			// 		},
			// 		body: JSON.stringify({
			// 			prompt: `${prompt}`,
			// 			n: 5,
			// 			model: 'dall-e-2',
			// 			size: '512x512',
			// 		}),
			// 	}
			// )
			// const data = await response.json()

			// if (!isCancelled) {
			// 	dispatch({ type: 'IMAGES_GENERATED_SUCCESSFULLY', payload: data.data })
			// }
			const createdAt = timestamp.fromDate(new Date())
			// const imagesToAdd = data.data.map((image) => ({
			// 	url: image.url,
			// 	id: Math.floor(Math.random() * 1_000_000),
			// }))

			//Adding images to firebase history
			addDocument({
				prompt,
				// images: imagesToAdd,
				uid: user.uid,
				createdAt,
			})
		} catch (error) {
			if (isCancelled) {
				dispatch({ type: 'ERROR', payload: error.message })
			}
		}
	}

	useEffect(() => {
		return () => {
			;() => setIsCancelled(true)
		}
	}, [])
	return { generateImages, response }
}

export default useDalle
