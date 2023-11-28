import { useEffect, useState } from 'react'
import { useReducer } from 'react'
import { database } from '../firebase/config'
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore'
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

	const addDocument = async (newDoc, docID) => {
		try {
			let addedDocument = null

			if (docID) {
				console.log('user')
				let ref = doc(database, col, docID)
				console.log(newDoc)
				addedDocument = await setDoc(ref, {
					...newDoc,
				})
			} else {
				console.log('data!')
				let ref = collection(database, col)
				console.log(ref)
				addedDocument = await addDoc(ref, {
					...newDoc,
				})
			}

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
			let ref = doc(database, col, docID)
			const deletedDocument = deleteDoc(ref)
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
