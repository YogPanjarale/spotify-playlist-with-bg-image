import { User } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
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
	useEffect(() => {
		(async () => {
			const doc = await getDoc();
			setDoc(doc);
			if (doc) {
				setName(doc.name);
				setLink(doc.link);
				setImageAsUrl({imgUrl:doc.imgUrl});
                setIsDisabled(false);
			}
		})();
	}, []);
	const isValidLink = (link: string) => {
		//correct link https://open.spotify.com/playlist/4Zuu8wXfx9MYLRA17GeLQc?si=dbe563bb1eaa431e
		if (!link.startsWith("https://open.spotify.com/"))return false;
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
		<div className="flex flex-col space-y-4">
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
				<input type="file" onChange={handleImageAsFile} />
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
					}}
				>
					{doc === undefined ? "Add Playlist" : "Update Playlist"}
				</button>
			</form>
		</div>
	);
};
export default Form;
