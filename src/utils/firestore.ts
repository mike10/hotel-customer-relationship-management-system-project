import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { DocumentReference, collection, doc, getDoc, getDocs, getFirestore, runTransaction, writeBatch } from "firebase/firestore";
import { signInWithEmailAndPassword , createUserWithEmailAndPassword } from "firebase/auth";
import { IRoom } from "./constants";

const firebaseConfig = {
  apiKey: "AIzaSyDUiAodSQPNH8r0s6F3BfaMS-b1zX1LKUI",
  authDomain: "finance-blog-f38f2.firebaseapp.com",
  databaseURL: "https://finance-blog-f38f2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "finance-blog-f38f2",
  storageBucket: "finance-blog-f38f2.appspot.com",
  messagingSenderId: "140148358827",
  appId: "1:140148358827:web:99183db5674ede654981ee"
};
/* 
let response = await fetch('/firebaseConfig.json');
console.log(response);

let firebaseConfig = await response.json();
console.log(firebaseConfig); */

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const getAuthFirestore = () => {
  const auth = getAuth();
  return auth
}

export async function createNewAccount(username: string, password: string) {
    let result: boolean = false;
    console.log(username, password);
    
    await createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        result = true;
      })
      .catch(async (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        /* if (errorCode == "auth/email-already-in-use") {
          errorMessReg = "This email address already exists!";
        } else {
          errorMessReg = "Invalid email or password!";
        } */
        console.log(errorCode, errorMessage);
        result = false;
      });
    return result;
  }

export async function signIn(username: string, password: string) {
  let result: boolean = false;
  await signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      const user = userCredential.user;
      result = true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      result = false;
    });
  return result;
}  

export async function updateCheckIn(room:number, dateCheckIn:string, dateCheckOut:string) {
  const batch = writeBatch(db);
  let temp: IRoom;
  let sfDocRef: DocumentReference 
  const querySnapshot = await getDocs(collection(db, "rooms"));
  
  querySnapshot.forEach((doc) => {
    temp = <IRoom>doc.data();
    
      if(temp.room === room) {
        sfDocRef = <DocumentReference>doc.ref
        return
      }     
    });

  try {
    const newStatus = await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      transaction.update(sfDocRef, { checkIn: dateCheckIn, checkOut: dateCheckOut});
    });
  } catch (e) {
    console.error(e);
  }
}

export async function getRooms() {
  let temp: Array<IRoom> = [];
  const querySnapshot = await getDocs(collection(db, "rooms"));
  querySnapshot.forEach((doc) => {
    temp.push(<IRoom>doc.data());
  });
  return temp;
}

export async function getRoom(NRoom:number):Promise<IRoom|null> {
  const docRef = doc(db, "rooms", `room-${NRoom}`);
  const docSnap = await getDoc(docRef);
  let temp:IRoom 

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    temp = <IRoom>docSnap.data()
    return temp
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return null
  }
  
}
