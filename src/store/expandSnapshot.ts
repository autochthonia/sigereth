import { firestore } from 'firebase';

export interface DocumentSnapshotExpanded<T = firestore.DocumentData> {
  exists: firestore.DocumentSnapshot['exists'];
  ref: firestore.DocumentSnapshot['ref'];
  id: firestore.DocumentSnapshot['id'];
  metadata: firestore.DocumentSnapshot['metadata'];
  data: T;
}
export interface QuerySnapshotExpanded<T = firestore.DocumentData> {
  metadata: firestore.QuerySnapshot['metadata'];
  size: firestore.QuerySnapshot['size'];
  empty: firestore.QuerySnapshot['empty'];
  docs: {
    [docId: string]: DocumentSnapshotExpanded<T>;
  };
}

export const expandDocumentSnapshot: (
  snap: firestore.DocumentSnapshot<any> | firestore.QueryDocumentSnapshot<any>,
) => DocumentSnapshotExpanded<any> = snap => ({
  exists: snap.exists,
  ref: snap.ref,
  id: snap.id,
  metadata: snap.metadata,
  data: snap.data(),
});

export const expandQuerySnapshot: (
  snap: firestore.QuerySnapshot<any>,
) => QuerySnapshotExpanded<any> = snap => {
  let docs: {
    [docId: string]: DocumentSnapshotExpanded<any>;
  } = {};
  snap.docs === null
    ? (docs = null)
    : snap.docs.forEach(doc => {
        docs[doc.id] = expandDocumentSnapshot(doc);
      });
  return {
    metadata: snap.metadata,
    size: snap.size,
    empty: snap.empty,
    docs,
  };
};

export function expandSnapshot(
  snap: firestore.DocumentSnapshot<any> | firestore.QueryDocumentSnapshot<any>,
): DocumentSnapshotExpanded<any>;
export function expandSnapshot(snap: firestore.QuerySnapshot<any>): QuerySnapshotExpanded<any>;
export default function expandSnapshot(
  snap:
    | firestore.DocumentSnapshot<any>
    | firestore.QueryDocumentSnapshot<any>
    | firestore.QuerySnapshot<any>,
) {
  if (
    snap instanceof firestore.DocumentSnapshot ||
    snap instanceof firestore.QueryDocumentSnapshot
  ) {
    return expandDocumentSnapshot(snap);
  } else if (snap instanceof firestore.QuerySnapshot) {
    return expandQuerySnapshot(snap);
  } else {
    console.error('???');
  }
}
