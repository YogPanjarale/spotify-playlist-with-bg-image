import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

type Data = {
    name: string,
    link: string,
    background: string,
}
const updateDoc = (data:Data) => {
    const db = firebase.firestore();
    const uid = firebase.auth().currentUser.uid;
    const docRef = db.collection("songs").doc(uid);
    docRef.get().then((doc) => {
        if (doc.exists) {
            docRef.update(data)
        } else {
            docRef.set(data)
        }
    })
}
export default updateDoc