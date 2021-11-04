import {getData} from "../logic/firebaseAdmin";
type Data = {
    name: string,
    link: string,
    background: string,
}
export default function Page({data}:{data:Data}) {
    if (!data) return <div>Loading...</div>
    const getPlaylistId = (link:string) => {
        if (!link.startsWith("https://open.spotify.com/")) return false;
		const numMatch = /\/[\w0-9]{22}/g.exec(link);
		console.log(numMatch);
		return /[\w0-9]{22}/g.exec(numMatch[0])[0];
    }
    return (
<div className="flex justify-center items-center h-screen" 
dangerouslySetInnerHTML={{__html:`
<iframe
	src="https://open.spotify.com/embed/playlist/${getPlaylistId(data.link)}?theme=0"
	width="100%"
	height="380"
	frameborder="0"
	allowtransparency="true"
	allow="encrypted-media"
></iframe>
<style>
    body {
  background-image: url("${data.background}");
}
iframe{
    max-width: min-content;
}
</style>
`}}></div>

    )
}

export async function getStaticProps({ params }) {
    const { name } = params;
    console.log(name," ================================");
    const data = await getData(name);
    console.log(data," ================================");
    return {
        props: {
        data,
        },
    };
}
export async function getStaticPaths() {
    return {
      paths: [],
      fallback: true
    }
  }
