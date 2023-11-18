import useAuthContext from '../hooks/useAuthContext'
import useCollection from '../hooks/useCollection'

const History = () => {
	const { data } = useCollection('history')

	console.log(data)
	return <div>{data && data.map((document) => <p>{document.doc}</p>)}</div>
}

export default History
