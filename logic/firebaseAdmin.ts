import admin from 'firebase-admin';
if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not set');
}
const config = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
if (admin.apps.length === 0) {
admin.initializeApp({
    credential: admin.credential.cert({
      projectId: config.project_id,
      privateKey: config.private_key,
      clientEmail: config.client_email,
    }),
    databaseURL: `https://${config.project_id}.firebaseio.com`
  });
}
export async function getData(name: string) {
    const doc = await admin.firestore().collection('songs').where('name',"==",name).get();
    // console.log(doc.docs[0].data());
    // console.log("============================================")
    return doc.docs[0].data();
}
export default admin;
