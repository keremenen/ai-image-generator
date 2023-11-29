import {
	collection,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	where,
} from 'firebase/firestore'
import { database } from '../firebase/config'
import { useEffect, useRef, useState } from 'react'

const useCollection = (c, _q, orderIndex, orderType) => {
	const [data, setData] = useState(null)

	const q = useRef(_q).current

	useEffect(() => {
		let ref = collection(database, c)

		if (q) {
			ref = query(ref, where(...q))
		}

		if (orderIndex && orderType) {
			ref = query(ref, where(...q), orderBy(orderIndex, orderType))
		}

		const unsub = onSnapshot(ref, (snapshot) => {
			let results = []
			snapshot.docs.forEach((document) => {
				results.push({ ...document.data(), id: document.id })
			})
			setData(results)
		})
		return () => unsub()
	}, [c, q])

	return { data }
}

export default useCollection
