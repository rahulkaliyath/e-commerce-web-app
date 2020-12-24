import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyCrz2cXg3UNg5vBopUU9J6dcp3qsjv-_BQ",
    authDomain: "e-commerce-db-4b0ef.firebaseapp.com",
    projectId: "e-commerce-db-4b0ef",
    storageBucket: "e-commerce-db-4b0ef.appspot.com",
    messagingSenderId: "95527760146",
    appId: "1:95527760146:web:4233ef75b9e58b0d1e83cb",
    measurementId: "G-PK16LE9RV6"
  };

export const createUserProfileDocument = async (userAuth,additionalData) =>
{
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  
  if(!snapShot.exists){
    const {displayName,email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({displayName,email,createdAt,...additionalData })
    }
    catch (error){
      console.log('error creating user',error.message);
    }
  }
  return userRef;
} 

export const addCollectionAndDocuments = (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef,obj);
    
  });

  batch.commit();
};  

export const convertCollectionsToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const {title,items} = doc.data();

    return {
      routeName:encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })
  return transformedCollection.reduce((accumalator,collection) => {
    accumalator[collection.title.toLowerCase()] = collection;
    return accumalator;
  },{});
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
