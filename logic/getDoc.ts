import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const getDoc = async () => {
    const db = firebase.firestore();
    const uid = firebase.auth().currentUser.uid;
    const docRef = db.collection("songs").doc(uid);
    const doc = await docRef.get();
    return doc.data();
}

export default getDoc;