import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyBp0kROmteGKMGIzmhVKAemoTUXYYZniZk',
	authDomain: 'ai-image-generator-4c857.firebaseapp.com',
	projectId: 'ai-image-generator-4c857',
	storageBucket: 'ai-image-generator-4c857.appspot.com',
	messagingSenderId: '118637365200',
	appId: '1:118637365200:web:895837db6593c69a1c5bd5',
}

initializeApp(firebaseConfig)

const auth = getAuth()

export { auth }
