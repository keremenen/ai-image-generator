import {
	collection,
	getDocs,
	onSnapshot,
	orderBy,
	query,
} from 'firebase/firestore'
import { database } from '../firebase/config'
import { useEffect, useState } from 'react'

const useCollection = (c) => {
	const [data, setData] = useState(null)

	useEffect(() => {
		const ref = collection(database, c)
		const q = query(ref, orderBy('createdAt', 'desc'))

		const unsub = onSnapshot(q, (snapshot) => {
			let results = []
			snapshot.docs.forEach((document) => {
				results.push({ ...document.data(), id: document.id })
			})
			setData(results)
		})
		return () => unsub()
	}, [c])

	return { data }
}

export default useCollection
