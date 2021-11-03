export default function SignIn({ onClick }: { onClick: () => void }) {
	return (
		<button
			className="shadow-lg bg-blue-500 rounded inline-flex p-1 items-center space-x-2"
			onClick={onClick}
		>
			<img
				src="https://www.google.com/favicon.ico"
				className="bg-white rounded h-10"
			/>
			<span className="text-white ">Sign in with Google</span>
		</button>
	);
}
