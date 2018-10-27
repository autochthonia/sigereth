import {
  DocumentSnapshot,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentSnapshotExpanded,
  QuerySnapshotExpanded,
} from 'types/Firestation';
import { firestore } from 'firebase';

export const expandDocumentSnapshot: (
  snap: DocumentSnapshot<any> | QueryDocumentSnapshot<any>,
) => DocumentSnapshotExpanded<any> = snap => ({
  exists: snap.exists,
  ref: snap.ref,
  id: snap.id,
  metadata: snap.metadata,
  data: snap.data(),
});

export const expandQuerySnapshot: (
  snap: QuerySnapshot<any>,
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

// function pickCard(x: {suit: string; card: number; }[]): number;
// function pickCard(x: number): {suit: string; card: number; };

export function expandSnapshot(
  snap: DocumentSnapshot<any> | QueryDocumentSnapshot<any>,
): DocumentSnapshotExpanded<any>;
export function expandSnapshot(snap: QuerySnapshot<any>): QuerySnapshotExpanded<any>;
export default function expandSnapshot(
  snap: DocumentSnapshot<any> | QueryDocumentSnapshot<any> | QuerySnapshot<any>,
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
