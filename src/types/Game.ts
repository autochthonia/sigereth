import { Combat } from './Combat';
import { Character } from './Character';

export interface Message {
  createdAt: Date;
  body: string;
}

export interface Game {
  name: string;
  owner: firebase.firestore.DocumentReference;
  players: firebase.firestore.DocumentReference[];
  combat: Combat;
  characters: Character[];
}
