import { Combat } from './Combat';
import { Character } from './Character';
import { Collection, DocumentReference } from './Firestation';
import { User } from './User';

export interface Message {
  createdAt: Date | FieldValue;
  body: string;
  sender: DocumentReference<User | Player>;
}

export enum EventType {
  roll = 'ROLL',
}

export interface Event {
  type: EventType;
}

export enum UserRole {
  owner = 'OWNER',
  player = 'PLAYER',
}

export interface Player {
  username: string;
  user: DocumentReference<User>;
  role: UserRole;
}

export interface Game {
  name: string;
  owner: DocumentReference<Player>;
  players?: Collection<Player>;
  combats?: Collection<Combat>;
  characters?: Collection<Character>;
  messages?: Collection<Message>;
  events?: Collection<Event>;
}
