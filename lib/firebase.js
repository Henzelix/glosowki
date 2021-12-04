import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD8Kta51EwLNvVZh6fX1I3ex98osVUrrhU",
    authDomain: "glosowki-ecfb9.firebaseapp.com",
    projectId: "glosowki-ecfb9",
    storageBucket: "glosowki-ecfb9.appspot.com",
    messagingSenderId: "184637766571",
    appId: "1:184637766571:web:17da57548e6635f2c3b0ee"
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();
export const storage = firebase.storage();
// export const loginProvider = new firebase.auth.EmailAuthProvider();

// export function postToJSON(doc) {
//   const data = doc.data();
//   const id = doc.id;
//   return {
//     ...data,
//     id,
//     publishedAt: data.publishedAt.toMillis(),    
//   };
// }
