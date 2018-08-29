import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBEHtCfN8exbdLXvM0cudPNFAOTBSOsjME',
  authDomain: 'sigereth.firebaseapp.com',
  d1atabaseURL: 'https://sigereth.firebaseio.com',
  projectId: 'sigereth',
  storageBucket: 'sigereth.appspot.com',
  messagingSenderId: '982858495175',
};
firebase.initializeApp(config);

firebase
  .auth()
  .signInAnonymously()
  .catch(function(error) {
    console.error('Auth error', error.code, error.message);
  });

export const store = firebase.firestore();
store.settings({ timestampsInSnapshots: true });

export default firebase;

console.error('remember to change firebase rules + remake keys');
