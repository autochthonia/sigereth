import { firestore } from 'firebase';
import { DocumentReference } from 'types/Firestation';
import { User } from 'types/User';
import { Game } from 'types/Game';
// @ts-ignore
import { useMemo } from 'react';

export const createFSUserRef: (userId: string) => DocumentReference<User> = userId =>
  firestore().doc(`users/${userId}`) as DocumentReference<User>;

export const createFSGameRef: (gameId: string) => DocumentReference<Game> = gameId =>
  useMemo(
    () =>
      firestore()
        .collection('games')
        .doc(gameId),
    [gameId],
  ) as DocumentReference<Game>;
