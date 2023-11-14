import { addDoc, collection, doc } from 'firebase/firestore'
import { database } from '../firebase/config'
import useAuthContext from './useAuthContext'

const useAddHistoryEntry = () => {
	const { user } = useAuthContext()

	const addHistoryEntry = async (prompt) => {
		const ref = collection(database, 'history')
		try {
			const res = await addDoc(ref, { prompt: prompt, uuid: user.uid })
		} catch (e) {
			console.log(`Error adding document: ${e}`)
		}
	}

	return { addHistoryEntry }
}

export default useAddHistoryEntry
