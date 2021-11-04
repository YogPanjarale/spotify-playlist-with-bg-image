import { User } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import getDoc from "../logic/getDoc";
import updateDoc from "../logic/updateDoc";
import TextInput from "./TextInput";


const Form = ({ user }: { user: User }) => {
	const [nameErr, setNameErr] = useState("");
	const [name, setName] = useState("");
	const [link, setLink] = useState("");
	const [linkErr, setLinkErr] = useState("");
	const [isDisabled, setIsDisabled] = useState(true);
	const allInputs = { imgUrl: "" };
	const [imageAsFile, setImageAsFile] = useState<File>();
	const [imageAsUrl, setImageAsUrl] = useState(allInputs);
	const [imageErr, setImageErr] = useState("");
	const [doc, setDoc] = useState(undefined);
    const router = useRouter();
	useEffect(() => {
		(async () => {
			const doc = await getDoc();
			setDoc(doc);
			if (doc) {
				setName(doc.name);
				setLink(doc.link);
				setImageAsUrl({ imgUrl: doc.background });
				setIsDisabled(false);
			}
		})();
	}, []);
	const isValidLink = (link: string) => {
		//correct link https://open.spotify.com/playlist/4Zuu8wXfx9MYLRA17GeLQc?si=dbe563bb1eaa431e
		if (!link.startsWith("https://open.spotify.com/")) return false;
		const numMatch = /\/[\w0-9]{22}/g.exec(link);
		console.log(numMatch);
		return /[\w0-9]{22}/g.exec(numMatch[0])[0];
	};
	const isValidName = (name: string) => {
		return name.length > 0 && name.length < 20 && !/\s/.test(name);
	};
	const handleImageAsFile = (e) => {
		const image = e.target.files[0];
		setImageAsFile((imageFile) => image);
	};
	const uploadImage = async () => {
		const storageRef = firebase.storage().ref();
		const imageRef = storageRef.child(`${user.uid}/${imageAsFile.name}`);
		const snapshot = await imageRef.put(imageAsFile);
		const imageUrl = await snapshot.ref.getDownloadURL();
		setIsDisabled(false);
		setImageAsUrl({ imgUrl: imageUrl });
	};

	return (
		<div className="flex flex-col space-y-4 max-w-md">
			<div>
				<h1 className="text-lg text-bold font-poppins">
					Hello {user.displayName}!
				</h1>
				<h2 className="text-base text-bold font-poppins text-gray-600">
					Fill in the Details
				</h2>
			</div>
			<form
				className="flex flex-col space-y-2"
				onSubmit={(e) => {
					e.preventDefault();
					console.log(e);
				}}
			>
				<span className="text-sm text-bold font-poppins text-gray-600 text-left">
					Spotify Playlist link
				</span>
				<TextInput
					id="playlist link"
					placeholder="Playlist Link"
					value={link}
					onChange={(e) => {
						setLink(e.target.value);
						const r = isValidLink(e.target.value);
						r ? setIsDisabled(false) : setIsDisabled(true);
						r ? setLinkErr("") : setLinkErr("Invalid Link");
					}}
				/>
				{linkErr && (
					<span className="text-xs text-bold font-poppins text-red-600 text-left ">
						* {linkErr}
					</span>
				)}
				<span className="text-sm text-bold font-poppins text-gray-600 text-left">
					Name It in one word
				</span>
				<TextInput
					id="url"
					placeholder="example /mhmm"
					value={name}
					onChange={(n) => {
						n = n.target.value;
						setName(n);
						isValidName(n)
							? setNameErr("")
							: setNameErr(
									"Name should be between 1 and 20 characters and should not contain spaces"
							  );
					}}
				/>
				{nameErr && (
					<span className="text-xs text-bold font-poppins text-red-600 text-left ">
						* {nameErr}
					</span>
				)}
				<p className="text-sm text-bold font-poppins text-blue-600 text-left truncate ">
					{imageAsUrl.imgUrl}
				</p>
				<div
					className="flex flex-row space-x-2 appearance-none border-2 border-gray-300 rounded w-full py-1 px-3 focus:outline-none focus:bg-white focus:border-darkgreen
                leading-10  font-poppins text-base font-normal"
				>
					<img
						src={imageAsUrl.imgUrl}
						alt="background image preview"
						className="w-12 "
                        title={imageAsUrl.imgUrl}
					/>
					<input type="file" onChange={handleImageAsFile} />
					{imageAsFile&& <button onClick={uploadImage} title="Upload">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
							/>
						</svg>
					</button>}
				</div>
				{imageErr && (
					<span className="text-xs text-bold font-poppins text-red-600 text-left ">
						* {imageErr}
					</span>
				)}
				<button
					className={`${
						!isDisabled
							? "bg-blue-500 hover:bg-blue-700"
							: "bg-blue-200"
					}  text-white font-bold py-2 px-4 rounded`}
					type="button"
					disabled={!!isDisabled}
					onClick={() => {
						let background = imageAsUrl.imgUrl;
						if (!background) {
							setIsDisabled(true);
							setImageErr("Please upload an image");
							return;
						}
						updateDoc({ name, link, background });
                        getDoc().then((d)=>{
                            setDoc(d);
                        })
					}}
				>
					{doc === undefined ? "Add Playlist" : "Update Playlist"}
				</button>
                {doc === undefined ? null : <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>router.push(doc.name)}> Visit </button>}

			</form>
		</div>
	);
};
export default Form;
