import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { database } from '../firebase/config'
import { useEffect, useState } from 'react'

const useCollection = (c) => {
	const [data, setData] = useState(null)

	useEffect(() => {
		const ref = collection(database, c)

		const unsub = onSnapshot(ref, (snapshot) => {
			console.log(snapshot)
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
