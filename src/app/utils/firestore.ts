import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDUiAodSQPNH8r0s6F3BfaMS-b1zX1LKUI",
    authDomain: "finance-blog-f38f2.firebaseapp.com",
    databaseURL: "https://finance-blog-f38f2-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "finance-blog-f38f2",
    storageBucket: "finance-blog-f38f2.appspot.com",
    messagingSenderId: "140148358827",
    appId: "1:140148358827:web:99183db5674ede654981ee"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);