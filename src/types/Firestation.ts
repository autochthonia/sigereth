import firebase from 'firebase';

export interface Document<DataType> {
  exists: firebase.firestore.DocumentSnapshot['exists'];
  ref: firebase.firestore.DocumentSnapshot['ref'];
  id: firebase.firestore.DocumentSnapshot['id'];
  metadata: firebase.firestore.DocumentSnapshot['metadata'];
  data: DataType;
}

export interface Query<DataType> {
  metadata: firebase.firestore.QuerySnapshot['metadata'];
  size: firebase.firestore.QuerySnapshot['size'];
  empty: firebase.firestore.QuerySnapshot['empty'];
  docs: {
    [docId: string]: Document<DataType>;
  };
}
