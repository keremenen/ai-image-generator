import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { database } from '../firebase/config'

const useDocument = (c, id) => {
	const [document, setDocument] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		const ref = doc(database, c, id)

		const unsub = onSnapshot(
			ref,
			(snapshot) => {
				if (snapshot.data()) {
					setDocument({ ...snapshot.data(), id: snapshot.id })
					setError(null)
				} else {
					setError('No such document exist')
				}
			},
			(error) => {
				console.log(error.message)
				setError('Failed to get document')
			}
		)

		return () => unsub()
	}, [c, id])

	return { document, error }
}

export default useDocument
