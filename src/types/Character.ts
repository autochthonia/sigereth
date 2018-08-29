export enum IntimacyType {
  tie = 'TIE',
  principle = 'PRINCIPLE',
}
export enum IntimacyLevel {
  minor = 'MINOR',
  major = 'MAJOR',
  defining = 'DEFINING',
}

export interface Intimacy {
  label: string;
  type: IntimacyType;
  level: IntimacyLevel;
}

export type Character = FullCharacter | QuickCharacter;

export interface FullCharacter {
  characterType: 'FullCharacter';
  name: string;
  attributes: { [A in Attribute]: number };
  abilities: { [A in Ability]: number };
  specialties: { [A in Ability]?: string };
  merits: {
    [meritName: string]: number;
  };
  willpower: {
    permanent: number;
    temporary: number;
  };
  limit: number;
  limitTrigger: string;
  essence: number;
  motes: {
    personalCurrent: number;
    peripheralCurrent: number;
    personalTotal: number;
    peripheralTotal: number;
  };
  experience: {
    regularCurrent: number;
    solarCurrent: number;
    regularTotal: number;
    solarTotal: number;
  };
  weapons: Weapon[];
  armor: Armor[];
  health: {
    healthLevels: { [L in HealthLevels]: number };
    damageBashing: { [L in HealthLevels]: number };
    damageLethal: { [L in HealthLevels]: number };
    damageAggravated: { [L in HealthLevels]: number };
  };
  intimacies: Intimacy[];
}

export interface QuickCharacter {
  characterType: 'QuickCharacter';
  name: string;
  essence: number;
  willpower: {
    permanent: number;
    temporary: number;
  };
  motes: {
    personalCurrent: number;
    peripheralCurrent: number;
    personalTotal: number;
    peripheralTotal: number;
  };
  health: {
    healthLevels: { [L in HealthLevels]: number };
    damageBashing: { [L in HealthLevels]: number };
    damageLethal: { [L in HealthLevels]: number };
    damageAggravated: { [L in HealthLevels]: number };
  };
  evasion: number;
  parry: number;
  resolve: number;
  guile: number;
  soak: number;
  hardness: number;
  intimacies: Intimacy[];
  actions: string[];
  attacks: string[];
  combatMovement: number;
  joinBattle: number;
  //   speedBonus
}

enum EquipmentType {
  mortal = 'MORTAL',
  artifact = 'ARTIFACT',
}
enum EquipmentCategory {
  light,
  medium,
  heavy,
}

export interface Weapon {
  name: string;
  type: EquipmentType;
  category: EquipmentCategory;
  accuracy: number;
  damage: number;
  defense: number;
  overwhelming: number;
  tags: string[];
  combatAbility: Ability;
}

export interface Armor {
  name: string;
  category: EquipmentCategory;
  mobilityPenalty: number;
  tags: string[];
}

export enum Attribute {
  strength = 'STRENGTH',
  dexterity = 'DEXTERITY',
  stamina = 'STAMINA',
  charisma = 'CHARISMA',
  manipulation = 'MANIPULATION',
  appearance = 'APPEARANCE',
  perception = 'PERCEPTION',
  intelligence = 'INTELLIGENCE',
  wits = 'WITS',
}

export enum AttributeCategory {
  physical = 'PHYSICAL',
  social = 'SOCIAL',
  mental = 'MENTAL',
}

export const ATTRIBUTES = Object.keys(Attribute) as Attribute[];
export const ATTRIBUTE_GROUPS = {
  [AttributeCategory.physical]: [Attribute.strength, Attribute.dexterity, Attribute.stamina],
  [AttributeCategory.social]: [Attribute.charisma, Attribute.manipulation, Attribute.appearance],
  [AttributeCategory.mental]: [Attribute.perception, Attribute.intelligence, Attribute.wits],
};

export enum Ability {
  archery = 'ARCHERY',
  athletics = 'ATHLETICS',
  awareness = 'AWARENESS',
  brawl = 'BRAWL',
  bureaucracy = 'BUREAUCRACY',
  craft = 'CRAFT',
  dodge = 'DODGE',
  integrity = 'INTEGRITY',
  investigation = 'INVESTIGATION',
  larceny = 'LARCENY',
  linguistics = 'LINGUISTICS',
  lore = 'LORE',
  martialArts = 'MARTIAL ARTS',
  medicine = 'MEDICINE',
  melee = 'MELEE',
  occult = 'OCCULT',
  performance = 'PERFORMANCE',
  presence = 'PRESENCE',
  resistance = 'RESISTANCE',
  ride = 'RIDE',
  sail = 'SAIL',
  socialize = 'SOCIALIZE',
  stealth = 'STEALTH',
  survival = 'SURVIVAL',
  thrown = 'THROWN',
  war = 'WAR',
}

export const ABILITIES = Object.keys(Ability) as Ability[];

export type HealthLevels = 0 | -1 | -2 | -4 | 'I';
