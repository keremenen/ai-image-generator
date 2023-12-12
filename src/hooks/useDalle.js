import { useReducer, useState, useEffect } from 'react'
import { useFirestore } from './useFirestore'

import useAuthContext from './useAuthContext'
import { database, timestamp } from '../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'
import useDocument from './useDocument'

const initialState = {
	isLoading: false,
	error: false,
	images: null,
	success: false,
}
// Funkcja reducera dalle
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

// Hook useDalle używany jest za każdym razem po wysłaniu poprawnego prompta ze strony głownej

export const useDalle = () => {
	// User pochodzi z customowego hooka useAuthContext, który weryfikuje czy w danym momencie
	// ... użytkownik jest zalogowany czy wylogowany
	const { user } = useAuthContext()

	// Use reducer przechowuje stan aplikacji
	const [response, dispatch] = useReducer(dalleReducer, initialState)

	// Ue State przechowuje stan dla tego komponentu (nie wymaga użycia reducera)
	const [isCancelled, setIsCancelled] = useState(false)

	// Za pomocą customowego hooka useDocument sprawdzam czy firebase przechowuje informacje (dotyczace ...
	// ... ilości dostępnych kredytów) w swojej bazie danych.
	const { document, error } = user
		? useDocument('users', user.uid)
		: { document: null, error: null }

	// Destrukturyzję funkcję addDocument z customowego hooka useFirestore
	const { addDocument } = useFirestore('history')

	// Generate images odpowiada za generowanie obrazków z podanego prompta
	const generateImages = async (prompt) => {

		// Jeżeli prompt jest pusty = wyjdź z funkcji
		if (!prompt) return

		// Dispatchuje stan do reducera
		dispatch({ type: 'IS_LOADING' })

		// Jeżeli użytkownik nie ma kretydów to przekazuję błąd do reducera i wychodzę z funkcji ...
		// ... generateImages
		if (document.credits < 0) {
			dispatch({
				type: 'ERROR',
				payload:
					'No more credits. Add credits to your account to be able to generate more images',
			})
			return
		}

		// KOD ODPOWIEDZIALNY ZA POŁĄCZENIE Z API DALL-E
		// Try próbuje wykonać fetcha na endpoint z dokumentacji Dall-e (metoda post)
		try {
			const response = await fetch(
				'https://api.openai.com/v1/images/generations ',
				{
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
						// Klucz dalle znajduje się w .env VITE
						Authorization: `Bearer ${import.meta.env.VITE_DALLE_API_KEY}`,
					},
					body: JSON.stringify({
						// Prompt z home page
						prompt: `${prompt}`,
						// N definiuje ilość obrazków
						n: 5,
						// Model AI (dostępne dall-e-2 oraz dall-e-3)
						model: 'dall-e-2',
						// Rozmiary generowanych obrazków
						size: '512x512',
					}),
				}
			)

			// Data oczekuje na response.json()
			const data = await response.json()

			// IF sprawdza czy podczas działania funkcji asynchronicznej użytkownik nie ...
			// ... anulował jej przechodząc na np. inną podstronę
			if (!isCancelled) {
				dispatch({ type: 'IMAGES_GENERATED_SUCCESSFULLY', payload: data.data })
			}

			// Timestamp pochodzi z firebase, wstawia do bazy danych wpis z dokładną datą ... 
			// ... wywołania funkcji
			const createdAt = timestamp.fromDate(new Date())

			// imagesToAdd jest tablicą pomocniczą, która zaiwera obiekty z URL i ID obrazków
			const imagesToAdd = data.data.map((image) => ({
				url: image.url,
				id: Math.floor(Math.random() * 1_000_000),
			}))

			// Usunięcie 1 kredytu po każdym wywołaniu funkcji generateImages
			const ref = doc(database, 'users', user.uid)
			await updateDoc(ref, { credits: document.credits - 1 })

			// Dodanie wpisu do historii firebase. Wpis zawiera obiekt. W momencie błędu do ...
			// ... stanu aplikacji dispatchowany jest błąd z jego treścią
			addDocument({
				prompt,
				images: imagesToAdd,
				uid: user.uid,
				createdAt,
			})
		} catch (error) {
			if (isCancelled) {
				dispatch({ type: 'ERROR', payload: error.message })
			}
		}
	}

	// UseEffect po return wywołuje kod w momencie odmontowania komponentu. 
	useEffect(() => {
		return () => {
			; () => setIsCancelled(true)
		}
	}, [])
	return { generateImages, response }
}

export default useDalle
