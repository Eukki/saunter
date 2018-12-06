import firebase from 'firebase/app';
import 'firebase/database';


const config = {
	apiKey: "AIzaSyCQPedrIosBo1uxLaIDZxQO0KEsCjlzgyU",
	authDomain: "testmap-1542091002597.firebaseapp.com",
	databaseURL: "https://testmap-1542091002597.firebaseio.com",
	projectId: "testmap-1542091002597",
	storageBucket: "testmap-1542091002597.appspot.com",
	messagingSenderId: "2934956787"
};

firebase.initializeApp(config);

const database = firebase.database(); 

export default database;