export interface Combatant {
    name: string;
    initiative: number;
    turnOver: boolean;
    evasion: number;
    parry: number;
    onslaught: number;
    willpower: number;
    woundPenalty: number;
}

export interface Message {
    createdAt: Date;
    body: string;
}