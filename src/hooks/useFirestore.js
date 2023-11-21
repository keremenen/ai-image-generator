import { useEffect, useState } from 'react'
import { useReducer } from 'react'
import { database, timestamp } from '../firebase/config'
import { addDoc, collection, deleteDoc } from 'firebase/firestore'
import useAuthContext from './useAuthContext'

const initialState = {
	isPending: false,
	document: null,
	error: null,
	success: false,
}

export const firestoreReducer = (state, action) => {
	switch (action.type) {
		case 'IS_PENDING':
			return {
				...state,
				isPending: true,
				document: null,
				success: false,
				error: null,
			}
		case 'ADDED_DOCUMENT':
			return {
				...state,
				isPending: false,
				document: action.payload,
				success: true,
				error: null,
			}
		case 'DELETED_DOCUMENT':
			return {
				...state,
				isPending: false,
				document: action.payload,
				success: true,
				error: null,
			}
		case 'ERROR':
			return {
				...state,
				isPending: false,
				document: null,
				success: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const useFirestore = (col) => {
	const [response, dispatch] = useReducer(firestoreReducer, initialState)
	const [isCancelled, setIsCancelled] = useState(false)
	const { user } = useAuthContext()
	const ref = collection(database, col)

	//Add document
	const addDocument = async (doc) => {
		dispatch({ type: 'IS_PENDING' })
		console.dir(doc)
		try {
			const createdAt = timestamp.fromDate(new Date())
			const addedDocument = await addDoc(ref, {
				...doc,
				createdAt,
				uid: user.uid,
			})

			if (!isCancelled) {
				dispatch({ type: 'ADDED_DOCUMENT', payload: addedDocument })
			}
		} catch (error) {
			if (!isCancelled) {
				dispatch({ type: 'ERROR', payload: error.message })
			}
		}
	}
	//Delete document
	const deleteDocument = async (docID) => {
		dispatch({ type: 'isPending' })

		try {
			const deletedDocument = deleteDoc(ref, docID)
			if (!isCancelled) {
				dispatch({ type: 'DELETED_DOCUMENT', payload: deletedDocument })
			}
		} catch (error) {
			if (!isCancelled) {
				dispatch({ ERROR: payload.error.message, payload: error.message })
			}
		}
	}

	useEffect(() => {
		return () => {
			;() => setIsCancelled(true)
		}
	}, [])

	return { addDocument, deleteDocument, response }
}
