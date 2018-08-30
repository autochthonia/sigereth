import firebase from 'firebase';

export interface DocumentSnapshot<DataType = DocumentData>
  extends firebase.firestore.DocumentSnapshot {
  data(options?: SnapshotOptions): DataType | undefined;
}
export interface QueryDocumentSnapshot<DataType = DocumentData>
  extends firebase.firestore.QueryDocumentSnapshot {
  data(options?: SnapshotOptions): DataType | undefined;
}

export interface QuerySnapshot<DataType = DocumentData> extends firebase.firestore.QuerySnapshot {
  readonly docs: QueryDocumentSnapshot<DataType>[];
}

export interface DocumentSnapshotExpanded<DataType = DocumentData> {
  exists: firebase.firestore.DocumentSnapshot['exists'];
  ref: firebase.firestore.DocumentSnapshot['ref'];
  id: firebase.firestore.DocumentSnapshot['id'];
  metadata: firebase.firestore.DocumentSnapshot['metadata'];
  data: DataType;
}

export interface QuerySnapshotExpanded<DataType = DocumentData> {
  metadata: firebase.firestore.QuerySnapshot['metadata'];
  size: firebase.firestore.QuerySnapshot['size'];
  empty: firebase.firestore.QuerySnapshot['empty'];
  docs: {
    [docId: string]: DocumentSnapshotExpanded<DataType>;
  };
}
