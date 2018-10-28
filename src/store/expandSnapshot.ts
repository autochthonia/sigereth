import { firestore } from 'firebase';

export const expandDocumentSnapshot: (
  snap: firestore.DocumentSnapshot<any> | firestore.QueryDocumentSnapshot<any>,
) => firestore.DocumentSnapshotExpanded<any> = snap => ({
  exists: snap.exists,
  ref: snap.ref,
  id: snap.id,
  metadata: snap.metadata,
  data: snap.data(),
});

export const expandQuerySnapshot: (
  snap: firestore.QuerySnapshot<any>,
) => firestore.QuerySnapshotExpanded<any> = snap => {
  let docs: {
    [docId: string]: firestore.DocumentSnapshotExpanded<any>;
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

// function pickCard(x: {suit: string; card: number; }[]): number;
// function pickCard(x: number): {suit: string; card: number; };

export function expandSnapshot(
  snap: firestore.DocumentSnapshot<any> | firestore.QueryDocumentSnapshot<any>,
): firestore.DocumentSnapshotExpanded<any>;
export function expandSnapshot(
  snap: firestore.QuerySnapshot<any>,
): firestore.QuerySnapshotExpanded<any>;
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
