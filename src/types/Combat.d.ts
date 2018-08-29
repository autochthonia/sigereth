import firebase from 'firebase';

export interface Combat {
  turn: number;
  combatants: Combatant[];
}

export interface Combatant {
  name: string;
  initiative: number;
  turnOver: boolean;
  evasion: number;
  parry: number;
  onslaught: number;
  willpower: number;
  woundPenalty: number;
  character?: firebase.firestore.DocumentReference;
}
