import { Combat } from './Combat';
import { Character } from './Character';
import { Collection, DocumentReference } from './Firestation';
import { User } from './User';

export interface Message {
  createdAt: Date | FieldValue;
  body: string;
  sender: DocumentReference<User>;
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

export interface Game {
  name: string;
  users: Collection<{ user: DocumentReference<User>; role: UserRole }>;
  combats: Collection<Combat>;
  characters: Collection<Character>;
  messages: Collection<Message>;
  events: Collection<Event>;
}
