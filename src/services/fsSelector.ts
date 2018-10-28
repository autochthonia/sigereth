import { firestore } from 'firebase';
import { User } from 'types/User';
import { Game } from 'types/Game';
// @ts-ignore
import { useMemo } from 'react';

export const createFSUserRef: (userId: string) => firestore.DocumentReference<User> = userId =>
  firestore().doc<User>(`users/${userId}`);

export const createFSGameRef: (gameId: string) => firestore.DocumentReference<Game> = gameId =>
  useMemo(
    () =>
      firestore()
        .collection('games')
        .doc(gameId),
    [gameId],
  );
