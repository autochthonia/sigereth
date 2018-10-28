// @ts-ignore
import { useState, useEffect } from 'react';
import { firestore } from 'firebase';
import expandSnapshot, { expandDocumentSnapshot, expandQuerySnapshot } from 'store/expandSnapshot';
import { updateLog, performanceLog } from './log';

function useFirestore<T>(firestoreRef: firestore.DocumentReference<T>): firestore.DocumentSnapshotExpanded<T>;
function useFirestore<T>(firestoreRef: firestore.CollectionReference<T>): firestore.QuerySnapshotExpanded<T>;
function useFirestore<T>(firestoreRef: firestore.DocumentReference<T> | firestore.CollectionReference<T>) {
  let initialState: firestore.DocumentSnapshotExpanded<T> | firestore.QuerySnapshotExpanded<T>;
  if (firestoreRef instanceof firestore.DocumentReference) {
    initialState = expandDocumentSnapshot({
      exists: false,
      ref: null,
      id: undefined,
      metadata: null,
      data: (): null => null,
    } as any) as firestore.DocumentSnapshotExpanded<T>;
  } else if (firestoreRef instanceof firestore.CollectionReference) {
    initialState = expandQuerySnapshot({
      metadata: null,
      size: 0,
      empty: true,
      docs: null,
    } as any) as firestore.QuerySnapshotExpanded<T>;
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
        console.warn('hi')
        if (firestoreRef instanceof firestore.DocumentReference) {
          return firestoreRef.onSnapshot((snap: firestore.DocumentSnapshot<T> | firestore.QueryDocumentSnapshot<T>) => {
            updateLog.info('useFirestore update');
            setState(expandSnapshot(snap));
            res();
          });
        } else if (firestoreRef instanceof firestore.CollectionReference) {
          return firestoreRef.onSnapshot((snap: firestore.QuerySnapshot<T>) => {
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
        const docState = state as firestore.DocumentSnapshotExpanded<T>
        loaded = docState.data === null;
      } else if (firestoreRef instanceof firestore.CollectionReference) {
        const queryState = state as firestore.QuerySnapshotExpanded<T>
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
    [firestoreRef],
  );

  return state;
}

export default useFirestore;
