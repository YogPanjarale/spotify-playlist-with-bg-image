import Head from "next/head";
import { SafeHydrate } from "../components/SafeHydrate";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import SignIn from "../components/signin";
import Form from "../components/Form";

const firebaseConfig = {
	apiKey: "AIzaSyDsFZ-5rUVyEWNxyhH0l2KVJlF_hgwAheo",
	authDomain: "profiles-9ef35.firebaseapp.com",
	databaseURL: "https://profiles-9ef35-default-rtdb.firebaseio.com",
	projectId: "profiles-9ef35",
	storageBucket: "profiles-9ef35.appspot.com",
	messagingSenderId: "744103055974",
	appId: "1:744103055974:web:8fe4e38553db8b324053a7",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

const signin = () => {
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
};

function Home() {
	const [user, loading, error] = useAuthState(auth as any);
	console.log(user, loading, error);
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Head>
				<title>Music Page</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
				{loading && (
					<h1 className="text-6xl font-bold">Music Page Generator</h1>
				)}
        {error && <h1 className="text-6xl font-bold">Error</h1>}
        {user ? <Form user={user}/> : <SignIn onClick={signin}/>}
			</main>

			<footer className="flex items-center justify-center w-full h-24 border-t">
				<a
					className="flex items-center justify-center text-sm "
					href="https://yogpanjarale.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					Made by Yog Panjarale
				</a>
			</footer>
		</div>
	);
}
export default function Index() {
	return (
		<SafeHydrate>
			<Home />
		</SafeHydrate>
	);
}
