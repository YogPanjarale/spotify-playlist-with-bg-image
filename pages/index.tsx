import Head from "next/head";
import Link from "next/link";
import {useRouter} from 'next/router'
function Home() {
	const router = useRouter()
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Head>
				<title>Music Page</title>
				<link rel="icon" href="https://img.icons8.com/fluency/96/000000/flute.png" />
			</Head>

			<main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center ">
				
					<h1 className="text-6xl font-bold">Music Page Generator</h1>
					<div className="h-12"></div>
					<Link href="/create">
					<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" title="Visit the page"> Create Your Own </button>
					</Link>
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
export default  Home