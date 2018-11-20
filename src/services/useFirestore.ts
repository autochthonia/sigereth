import { useState, useEffect } from 'react';
import { firestore } from 'firebase';
import expandSnapshot, {
  expandDocumentSnapshot,
  expandQuerySnapshot,
  DocumentSnapshotExpanded,
  QuerySnapshotExpanded,
} from 'store/expandSnapshot';
import { updateLog, performanceLog } from './log';

interface UseFirestoreOptions {
  subscribe?: boolean;
}

function useFirestore<T>(
  firestoreRef: firestore.DocumentReference<T>,
  options?: UseFirestoreOptions,
): DocumentSnapshotExpanded<T>;
function useFirestore<T>(
  firestoreRef: firestore.CollectionReference<T>,
  options?: UseFirestoreOptions,
): QuerySnapshotExpanded<T>;
function useFirestore<T>(
  firestoreRef: firestore.DocumentReference<T> | firestore.CollectionReference<T>,
  options?: UseFirestoreOptions,
) {
  let initialState: DocumentSnapshotExpanded<T> | QuerySnapshotExpanded<T>;
  const { subscribe = false } = options || {};
  if (firestoreRef instanceof firestore.DocumentReference) {
    initialState = expandDocumentSnapshot({
      exists: false,
      ref: null,
      id: undefined,
      metadata: null,
      data: (): null => null,
    } as any) as DocumentSnapshotExpanded<T>;
  } else if (firestoreRef instanceof firestore.CollectionReference) {
    initialState = expandQuerySnapshot({
      metadata: null,
      size: 0,
      empty: true,
      docs: null,
    } as any) as QuerySnapshotExpanded<T>;
  } else {
    console.error('???');
  }
  const [state, setState]: [
    typeof initialState,
    (newState: typeof initialState) => void
  ] = useState(initialState);

  useEffect(
    () => {
      performanceLog.debug('useFirestore withEffect');
      const effect = (res = () => {}) => {
        if (firestoreRef instanceof firestore.DocumentReference) {
          return subscribe
            ? firestoreRef.onSnapshot(
                (snap: firestore.DocumentSnapshot<T> | firestore.QueryDocumentSnapshot<T>) => {
                  updateLog.info('useFirestore update');
                  setState(expandSnapshot(snap));
                  res();
                },
              )
            : firestoreRef
                .get()
                .then(
                  (snap: firestore.DocumentSnapshot<T> | firestore.QueryDocumentSnapshot<T>) => {
                    updateLog.info('useFirestore update');
                    setState(expandSnapshot(snap));
                    res();
                  },
                );
        } else if (firestoreRef instanceof firestore.CollectionReference) {
          return subscribe
            ? firestoreRef['onSnapshot']((snap: firestore.QuerySnapshot<T>) => {
                updateLog.info('useFirestore update');
                setState(expandSnapshot(snap));
                res();
              })
            : firestoreRef.get().then((snap: firestore.QuerySnapshot<T>) => {
                updateLog.info('useFirestore update');
                setState(expandSnapshot(snap));
                res();
              });
        } else {
          console.error('???');
        }
      };
      let loaded: boolean;
      if (firestoreRef instanceof firestore.DocumentReference) {
        const docState = state as DocumentSnapshotExpanded<T>;
        loaded = docState.data === null;
      } else if (firestoreRef instanceof firestore.CollectionReference) {
        const queryState = state as QuerySnapshotExpanded<T>;
        loaded = queryState.docs === null;
      } else {
        console.error('???');
      }

      // TODO: Enable Suspense
      if (false && loaded) {
        throw new Promise(effect);
      } else {
        effect();
      }
    },
    [firestoreRef, subscribe],
  );

  return state;
}

export default useFirestore;
