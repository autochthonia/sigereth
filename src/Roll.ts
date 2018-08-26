import { sample, range, times, compact, flatten } from 'lodash';

type d10 = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface RollConfig {
  dice: number;
  autosuccesses?: number;
  targetNumber?: d10;
  double?: d10[];
  reroll?: d10[];
  cascade?: boolean;
}

interface RollResult {
  config: RollConfig;
  successes: number;
  diceRolled: number;
  rerolls: DiceRoll[];
  result: DiceRoll;
  botch: boolean;
}

type DiceRoll = d10[];

export default class Roll {
  static d10 = () => sample(range(1, 10)) as d10;
  static rollDice = (numDice: RollConfig['dice']) => times(numDice, Roll.d10);
  static rerollDice: (
    roll: DiceRoll,
    { reroll, cascade }: { reroll: RollConfig['reroll']; cascade?: RollConfig['cascade'] },
  ) => DiceRoll[] = (roll, { reroll = [], cascade = true }) => {
    const rerolls = compact(roll.map(r => (reroll.includes(r) ? Roll.d10() : false)));
    return [
      ...(rerolls.length > 0 ? [rerolls] : []),
      ...(cascade && rerolls.length > 0 ? Roll.rerollDice(rerolls, { reroll, cascade }) : []),
    ];
  };
  static countSuccesses = (
    roll: DiceRoll,
    {
      targetNumber = 7,
      double = [10],
      autosuccesses = 0,
    }: {
      targetNumber?: RollConfig['targetNumber'];
      double?: RollConfig['double'];
      autosuccesses?: RollConfig['autosuccesses'];
    } = {},
  ) =>
    roll.reduce(
      (result, die) => result + (die >= targetNumber ? (double.includes(die) ? 2 : 1) : 0),
      autosuccesses,
    );
  static roll: (config: RollConfig) => RollResult = config => {
    const { dice, autosuccesses, targetNumber, double, reroll, cascade } = config;
    const roll = Roll.rollDice(dice);
    const rerolls = Roll.rerollDice(roll, { reroll, cascade });
    const result = [...roll, ...flatten(rerolls)];
    const successes = Roll.countSuccesses(roll, { targetNumber, double, autosuccesses });
    return {
      config,
      successes,
      result,
      rerolls,
      diceRolled: result.length,
      botch: successes === 0 && result.includes(1),
    };
  };
  config: RollConfig;
  constructor(config: RollConfig) {
    this.config = config;
  }

  roll = () => Roll.roll(this.config);
}
