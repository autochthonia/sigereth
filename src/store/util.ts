import {
  DocumentSnapshot,
  QuerySnapshot,
  QueryDocumentSnapshot,
  DocumentSnapshotExpanded,
  QuerySnapshotExpanded,
} from 'types/Firestation';

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
  const docs: {
    [docId: string]: DocumentSnapshotExpanded<any>;
  } = {};
  snap.docs.forEach(doc => {
    docs[doc.id] = expandDocumentSnapshot(doc);
  });
  return {
    metadata: snap.metadata,
    size: snap.size,
    empty: snap.empty,
    docs,
  };
};
