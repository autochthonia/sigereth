import { HealthLevels, Character } from 'types/Character';
import { ceil, max } from 'lodash';

export interface DerivedStats {
  parry: number;
  evasion: number;
  rush: number;
  resolve: number;
  guile: number;
  disengage: number;
  joinBattle: number;
  woundPenalty: HealthLevels;
  motes: {
    personalTotal: number;
    peripheralTotal: number;
  };
  armorSoak: number;
  armorHardness: number;
  totalSoak: number;
  totalHardness: number;
  mobilityPenalty: number;
}

// @ts-ignore
export const getDerivedStats: (character: Character) => DerivedStats = character => {
  switch (character.characterType) {
    case 'FullCharacter': {
      const { attributes, abilities, weapons } = character;
      const weaponDefenses = weapons.map(w =>
        ceil((attributes.DEXTERITY + abilities[w.combatAbility]) / 2),
      );
      const unarmedDefenses = [abilities['MARTIAL ARTS'], abilities.BRAWL].map(ability =>
        ceil((attributes.DEXTERITY + ability) / 2),
      );

      const naturalSoak = attributes.STAMINA;
      const naturalHardness = 0;
      const armorSoak = 0;
      const armorHardness = 0;

      return {
        weaponDefenses,
        joinBattle: attributes.WITS + abilities.AWARENESS,
        rush: attributes.DEXTERITY + abilities.ATHLETICS,
        disengage: attributes.DEXTERITY + abilities.DODGE,
        featsOfStrength: attributes.STRENGTH + abilities.ATHLETICS,
        parry: max(weaponDefenses.concat(unarmedDefenses)),
        evasion: ceil((attributes.DEXTERITY + abilities.DODGE) / 2),
        resolve: ceil((attributes.WITS + abilities.INTEGRITY) / 2),
        guile: ceil((attributes.MANIPULATION + abilities.SOCIALIZE) / 2),
        // woundPenalty: 0,
        motes: {
          personalTotal: 0,
          peripheralTotal: 0,
        },
        naturalSoak,
        naturalHardness,
        armorSoak,
        armorHardness,
        mobilityPenalty: 0,
        totalSoak: naturalSoak + armorSoak,
        totalHardness: naturalHardness + armorHardness,
      };
    }
    case 'QuickCharacter': {
      return {
        joinBattle: character.joinBattle,
        rush: character.combatMovement,
        disengage: character.combatMovement,
        parry: character.parry,
        evasion: character.evasion,
        resolve: character.resolve,
        guile: character.guile,
        motes: {
          personalTotal: character.motes.personalTotal,
          peripheralTotal: character.motes.peripheralTotal,
        },
        totalSoak: character.soak,
        totalHardness: character.hardness,
        // mobilityPenalty: 0,
        // woundPenalty: 0,
      };
    }
  }
};
