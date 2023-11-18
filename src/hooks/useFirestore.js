import { useState } from "react"
import { useReducer } from "react"
import { database } from "../firebase/config"

const initialState = {
    isPending: false,
    document: null,
    error: null,
    success: false
}

export const firestoreReducer = (state, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    const ref = collection(database, collection)

    //Add document
    const addDocument = (doc) => {

    }
    //Delete document
    const deleteDocument = (docID) => {

    }

    return { addDocument, deleteDocument, response }

}