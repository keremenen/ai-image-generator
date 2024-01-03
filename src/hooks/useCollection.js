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

const useCollection = (c, _customQuery, _orderByValue) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    const customQuery = useRef(_customQuery).current
    const orderByValue = useRef(_orderByValue).current

    useEffect(() => {
        let ref = collection(database, c)

        if (customQuery) {
            ref = query(ref, where(...customQuery))
        }

        if (orderByValue) {
            ref = query(ref, orderBy(orderByValue, 'desc'))
        }

        const unsub = onSnapshot(
            ref,
            (snapshot) => {
                let results = []
                snapshot.docs.forEach((document) => {
                    results.push({ ...document.data(), id: document.id })
                })

                setData(results)
            },
            (error) => {
                console.log(error)
                setError('Nie można załadować danych.')
            }
        )

        return () => unsub()
    }, [c, query, orderBy])

    return { data, error }
}

export default useCollection
