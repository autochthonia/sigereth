import { times, isNumber, some, isArray } from 'lodash';

import Roll from './Roll';

describe('d10', () => {
  it('generates numbers', () => {
    times(100, Roll.d10).forEach(r => {
      expect(isNumber(r)).toBe(true);
      expect(r).toBeGreaterThanOrEqual(1);
      expect(r).toBeLessThanOrEqual(10);
    });
  });
});

describe('rollDice', () => {
  it('returns an array of dice', () => {
    const roll0 = Roll.rollDice(0);
    expect(roll0.length).toBe(0);
    const roll1 = Roll.rollDice(1);
    expect(roll1.length).toBe(1);
    const roll2 = Roll.rollDice(2);
    expect(roll2.length).toBe(2);
    const roll3 = Roll.rollDice(100);
    expect(roll3.length).toBe(100);
    roll3.forEach(r => {
      expect(isNumber(r)).toBe(true);
      expect(r).toBeGreaterThanOrEqual(1);
      expect(r).toBeLessThanOrEqual(10);
    });
  });
  // xit('errors', () => {
  //   expect(() => Roll.rollDice()).toThrow();
  //   expect(() => Roll.rollDice([])).toThrow();
  //   expect(() => Roll.rollDice('a')).toThrow();
  //   expect(() => Roll.rollDice(-1)).toThrow();
  //   expect(() => Roll.rollDice(false)).toThrow();
  // });
});

describe('countSuccesses', () => {
  describe('defaults', () => {
    // xit('works with number input', () => {
    //   expect(Roll.countSuccesses(1)).toBe(0);
    //   expect(Roll.countSuccesses(2)).toBe(0);
    //   expect(Roll.countSuccesses(3)).toBe(0);
    //   expect(Roll.countSuccesses(4)).toBe(0);
    //   expect(Roll.countSuccesses(5)).toBe(0);
    //   expect(Roll.countSuccesses(6)).toBe(0);
    //   expect(Roll.countSuccesses(7)).toBe(1);
    //   expect(Roll.countSuccesses(8)).toBe(1);
    //   expect(Roll.countSuccesses(9)).toBe(1);
    //   expect(Roll.countSuccesses(10)).toBe(2);
    // });
    it('works with number array input', () => {
      expect(Roll.countSuccesses([])).toBe(0);
      expect(Roll.countSuccesses([1])).toBe(0);
      expect(Roll.countSuccesses([2])).toBe(0);
      expect(Roll.countSuccesses([3])).toBe(0);
      expect(Roll.countSuccesses([4])).toBe(0);
      expect(Roll.countSuccesses([5])).toBe(0);
      expect(Roll.countSuccesses([6])).toBe(0);
      expect(Roll.countSuccesses([7])).toBe(1);
      expect(Roll.countSuccesses([8])).toBe(1);
      expect(Roll.countSuccesses([9])).toBe(1);
      expect(Roll.countSuccesses([10])).toBe(2);
    });
    it('works with large rolls', () => {
      expect(Roll.countSuccesses([1, 1, 1, 3, 3, 6, 6])).toBe(0);
      expect(Roll.countSuccesses([1, 5, 6, 7, 7, 9, 10])).toBe(5);
      expect(Roll.countSuccesses([1, 5, 6, 6, 7, 9, 10])).toBe(4);
      expect(Roll.countSuccesses([1, 4, 5, 6, 6, 10, 10])).toBe(4);
    });
  });
  describe('can set target number', () => {
    // xit('works with number input', () => {
    //   expect(Roll.countSuccesses(1, { targetNumber: 5 })).toBe(0);
    //   expect(Roll.countSuccesses(2, { targetNumber: 5 })).toBe(0);
    //   expect(Roll.countSuccesses(3, { targetNumber: 5 })).toBe(0);
    //   expect(Roll.countSuccesses(4, { targetNumber: 5 })).toBe(0);
    //   expect(Roll.countSuccesses(5, { targetNumber: 5 })).toBe(1);
    //   expect(Roll.countSuccesses(6, { targetNumber: 5 })).toBe(1);
    //   expect(Roll.countSuccesses(7, { targetNumber: 5 })).toBe(1);
    //   expect(Roll.countSuccesses(8, { targetNumber: 5 })).toBe(1);
    //   expect(Roll.countSuccesses(9, { targetNumber: 5 })).toBe(1);
    //   expect(Roll.countSuccesses(10, { targetNumber: 5 })).toBe(2);
    // });
    it('works with number array input', () => {
      expect(Roll.countSuccesses([1], { targetNumber: 5 })).toBe(0);
      expect(Roll.countSuccesses([2], { targetNumber: 5 })).toBe(0);
      expect(Roll.countSuccesses([3], { targetNumber: 5 })).toBe(0);
      expect(Roll.countSuccesses([4], { targetNumber: 5 })).toBe(0);
      expect(Roll.countSuccesses([5], { targetNumber: 5 })).toBe(1);
      expect(Roll.countSuccesses([6], { targetNumber: 5 })).toBe(1);
      expect(Roll.countSuccesses([7], { targetNumber: 5 })).toBe(1);
      expect(Roll.countSuccesses([8], { targetNumber: 5 })).toBe(1);
      expect(Roll.countSuccesses([9], { targetNumber: 5 })).toBe(1);
      expect(Roll.countSuccesses([10], { targetNumber: 5 })).toBe(2);
    });

    it('works with large rolls', () => {
      expect(Roll.countSuccesses([1, 1, 1, 3, 3, 6, 6], { targetNumber: 5 })).toBe(2);
      expect(Roll.countSuccesses([1, 5, 6, 7, 7, 9, 10], { targetNumber: 5 })).toBe(7);
      expect(Roll.countSuccesses([1, 5, 6, 6, 7, 9, 10], { targetNumber: 5 })).toBe(7);
      expect(Roll.countSuccesses([1, 4, 5, 6, 6, 10, 10], { targetNumber: 5 })).toBe(7);
    });
  });
  describe('can set doubles', () => {
    // xit('works with number input', () => {
    //   expect(Roll.countSuccesses(1, { double: [9] })).toBe(0);
    //   expect(Roll.countSuccesses(2, { double: [9] })).toBe(0);
    //   expect(Roll.countSuccesses(3, { double: [9] })).toBe(0);
    //   expect(Roll.countSuccesses(4, { double: [9] })).toBe(0);
    //   expect(Roll.countSuccesses(5, { double: [9] })).toBe(0);
    //   expect(Roll.countSuccesses(6, { double: [9] })).toBe(0);
    //   expect(Roll.countSuccesses(7, { double: [9] })).toBe(1);
    //   expect(Roll.countSuccesses(8, { double: [9] })).toBe(1);
    //   expect(Roll.countSuccesses(9, { double: [9] })).toBe(2);
    //   expect(Roll.countSuccesses(10, { double: [9] })).toBe(2);
    // });
    it('works with number array input', () => {
      expect(Roll.countSuccesses([1], { double: [9] })).toBe(0);
      expect(Roll.countSuccesses([2], { double: [9] })).toBe(0);
      expect(Roll.countSuccesses([3], { double: [9] })).toBe(0);
      expect(Roll.countSuccesses([4], { double: [9] })).toBe(0);
      expect(Roll.countSuccesses([5], { double: [9] })).toBe(0);
      expect(Roll.countSuccesses([6], { double: [9] })).toBe(0);
      expect(Roll.countSuccesses([7], { double: [9] })).toBe(1);
      expect(Roll.countSuccesses([8], { double: [9] })).toBe(1);
      expect(Roll.countSuccesses([9], { double: [9] })).toBe(2);
      expect(Roll.countSuccesses([10], { double: [9] })).toBe(1);
      expect(Roll.countSuccesses([10], { double: [9, 10] })).toBe(2);
    });
    it('works with large rolls', () => {
      expect(Roll.countSuccesses([1, 1, 1, 3, 3, 6, 6], { double: [9] })).toBe(0);
      expect(Roll.countSuccesses([1, 5, 6, 7, 7, 9, 10], { double: [9] })).toBe(5);
      expect(Roll.countSuccesses([1, 5, 6, 7, 7, 9, 10], { double: [9, 10] })).toBe(6);
      expect(Roll.countSuccesses([1, 5, 6, 6, 7, 9, 10], { double: [9] })).toBe(4);
      expect(Roll.countSuccesses([1, 5, 6, 6, 7, 9, 10], { double: [9, 10] })).toBe(5);
      expect(Roll.countSuccesses([1, 4, 5, 6, 6, 10, 10], { double: [9] })).toBe(2);
      expect(Roll.countSuccesses([1, 4, 5, 6, 6, 10, 10], { double: [9, 10] })).toBe(4);
    });
  });
  describe('autosuccesses', () => {
    // xit('works with number input', () => {
    //   expect(Roll.countSuccesses(1, { autosuccesses: 3 })).toBe(0 + 3);
    //   expect(Roll.countSuccesses(2, { autosuccesses: 3 })).toBe(0 + 3);
    //   expect(Roll.countSuccesses(3, { autosuccesses: 3 })).toBe(0 + 3);
    //   expect(Roll.countSuccesses(4, { autosuccesses: 3 })).toBe(0 + 3);
    //   expect(Roll.countSuccesses(5, { autosuccesses: 3 })).toBe(0 + 3);
    //   expect(Roll.countSuccesses(6, { autosuccesses: 3 })).toBe(0 + 3);
    //   expect(Roll.countSuccesses(7, { autosuccesses: 3 })).toBe(1 + 3);
    //   expect(Roll.countSuccesses(8, { autosuccesses: 3 })).toBe(1 + 3);
    //   expect(Roll.countSuccesses(9, { autosuccesses: 3 })).toBe(1 + 3);
    //   expect(Roll.countSuccesses(10, { autosuccesses: 3 })).toBe(2 + 3);
    // });
    it('works with number array input', () => {
      expect(Roll.countSuccesses([1], { autosuccesses: 3 })).toBe(0 + 3);
      expect(Roll.countSuccesses([2], { autosuccesses: 3 })).toBe(0 + 3);
      expect(Roll.countSuccesses([3], { autosuccesses: 3 })).toBe(0 + 3);
      expect(Roll.countSuccesses([4], { autosuccesses: 3 })).toBe(0 + 3);
      expect(Roll.countSuccesses([5], { autosuccesses: 3 })).toBe(0 + 3);
      expect(Roll.countSuccesses([6], { autosuccesses: 3 })).toBe(0 + 3);
      expect(Roll.countSuccesses([7], { autosuccesses: 3 })).toBe(1 + 3);
      expect(Roll.countSuccesses([8], { autosuccesses: 3 })).toBe(1 + 3);
      expect(Roll.countSuccesses([9], { autosuccesses: 3 })).toBe(1 + 3);
      expect(Roll.countSuccesses([10], { autosuccesses: 3 })).toBe(2 + 3);
    });
    it('works with large rolls', () => {
      expect(Roll.countSuccesses([1, 1, 1, 3, 3, 6, 6], { autosuccesses: 3 })).toBe(0 + 3);
      expect(Roll.countSuccesses([1, 5, 6, 7, 7, 9, 10], { autosuccesses: 3 })).toBe(5 + 3);
      expect(Roll.countSuccesses([1, 5, 6, 6, 7, 9, 10], { autosuccesses: 3 })).toBe(4 + 3);
      expect(Roll.countSuccesses([1, 4, 5, 6, 6, 10, 10], { autosuccesses: 3 })).toBe(4 + 3);
    });
  });
  describe('can set target number + doubles + autosuccesses', () => {
    // xit('works with number input', () => {
    //   expect(Roll.countSuccesses(1, { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
    //     0 + 2,
    //   );
    //   expect(Roll.countSuccesses(2, { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
    //     0 + 2,
    //   );
    //   expect(Roll.countSuccesses(3, { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
    //     0 + 2,
    //   );
    //   expect(Roll.countSuccesses(4, { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
    //     0 + 2,
    //   );
    //   expect(Roll.countSuccesses(5, { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
    //     1 + 2,
    //   );
    //   expect(Roll.countSuccesses(6, { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
    //     1 + 2,
    //   );
    //   expect(Roll.countSuccesses(7, { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
    //     1 + 2,
    //   );
    //   expect(Roll.countSuccesses(8, { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
    //     1 + 2,
    //   );
    //   expect(Roll.countSuccesses(9, { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
    //     2 + 2,
    //   );
    //   expect(Roll.countSuccesses(10, { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
    //     2 + 2,
    //   );
    // });
    it('works with number array input', () => {
      expect(Roll.countSuccesses([1], { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
        0 + 2,
      );
      expect(Roll.countSuccesses([2], { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
        0 + 2,
      );
      expect(Roll.countSuccesses([3], { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
        0 + 2,
      );
      expect(Roll.countSuccesses([4], { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
        0 + 2,
      );
      expect(Roll.countSuccesses([5], { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
        1 + 2,
      );
      expect(Roll.countSuccesses([6], { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
        1 + 2,
      );
      expect(Roll.countSuccesses([7], { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
        1 + 2,
      );
      expect(Roll.countSuccesses([8], { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
        1 + 2,
      );
      expect(Roll.countSuccesses([9], { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
        2 + 2,
      );
      expect(Roll.countSuccesses([10], { double: [9], targetNumber: 5, autosuccesses: 2 })).toBe(
        1 + 2,
      );
      expect(
        Roll.countSuccesses([10], { double: [9, 10], targetNumber: 5, autosuccesses: 2 }),
      ).toBe(2 + 2);
    });
    it('works with large rolls', () => {
      expect(
        Roll.countSuccesses([1, 1, 1, 3, 3, 6, 6], {
          double: [9],
          targetNumber: 5,
          autosuccesses: 2,
        }),
      ).toBe(2 + 2);
      expect(
        Roll.countSuccesses([1, 5, 6, 7, 7, 9, 10], {
          double: [9],
          targetNumber: 5,
          autosuccesses: 2,
        }),
      ).toBe(7 + 2);
      expect(
        Roll.countSuccesses([1, 5, 6, 7, 7, 9, 10], {
          double: [9, 10],
          targetNumber: 5,
          autosuccesses: 2,
        }),
      ).toBe(8 + 2);
      expect(
        Roll.countSuccesses([1, 5, 6, 6, 7, 9, 10], {
          double: [9],
          targetNumber: 5,
          autosuccesses: 2,
        }),
      ).toBe(7 + 2);
      expect(
        Roll.countSuccesses([1, 5, 6, 6, 7, 9, 10], {
          double: [9, 10],
          targetNumber: 5,
          autosuccesses: 2,
        }),
      ).toBe(8 + 2);
      expect(
        Roll.countSuccesses([1, 4, 5, 6, 6, 10, 10], {
          double: [9],
          targetNumber: 5,
          autosuccesses: 2,
        }),
      ).toBe(5 + 2);
      expect(
        Roll.countSuccesses([1, 4, 5, 6, 6, 10, 10], {
          double: [9, 10],
          targetNumber: 5,
          autosuccesses: 2,
        }),
      ).toBe(7 + 2);
    });
  });

  // xdescribe('errors given incorrect input', () => {
  //   it('errors with bad targetNumbers and doubles', () => {
  //     expect(() => Roll.countSuccesses(1, { targetNumber: 'a' })).toThrow();
  //     expect(() => Roll.countSuccesses(1, { targetNumber: [] })).toThrow();
  //     expect(() => Roll.countSuccesses(1, { targetNumber: null })).toThrow();
  //     expect(() => Roll.countSuccesses(1, { targetNumber: false })).toThrow();
  //     expect(() => Roll.countSuccesses(1, { double: 'a' })).toThrow();
  //     expect(() => Roll.countSuccesses(1, { double: [] })).toThrow();
  //     expect(() => Roll.countSuccesses(1, { double: null })).toThrow();
  //     expect(() => Roll.countSuccesses(1, { double: false })).toThrow();
  //   });
  //   it("shouldn't take no input", () => {
  //     expect(() => Roll.countSuccesses()).toThrow();
  //     expect(() => Roll.countSuccesses(['a'])).toThrow();
  //     expect(() => Roll.countSuccesses([undefined])).toThrow();
  //   });
  //   it("shouldn't take rolls with inputs below 1 or above 10", () => {
  //     expect(() => Roll.countSuccesses(0)).toThrow();
  //     expect(() => Roll.countSuccesses([0])).toThrow();
  //     expect(() => Roll.countSuccesses(11)).toThrow();
  //     expect(() => Roll.countSuccesses([11])).toThrow();
  //   });
  // });
});

describe('reroll', () => {
  describe('simple', () => {
    it('rerolls', () => {
      expect(Roll.rerollDice([1], { reroll: [1], cascade: false }).length).toBe(1);
      expect(Roll.rerollDice([1], { reroll: [2], cascade: false }).length).toBe(0);
      expect(Roll.rerollDice([1], { reroll: [2] }).length).toBe(0);
      const rerolls = times(100, () => {
        const rerolledDice = Roll.rerollDice([1], { reroll: [1] });
        expect(rerolledDice.length).toBeGreaterThanOrEqual(1);
        return rerolledDice;
      });
      expect(some(rerolls, r => r.length > 1)).toBe(true);
    });
    it.only('append', () => {
      expect(Roll.rerollDice([1], { reroll: [1], cascade: false }).length).toBe(1);
      expect(Roll.rerollDice([1], { reroll: [2], cascade: false }).length).toBe(0);
      expect(Roll.rerollDice([1], { reroll: [2] }).length).toBe(0);
      const rerolls = times(100, () => {
        const rerolledDice = Roll.rerollDice([1], { reroll: [1] });
        expect(rerolledDice.length).toBeGreaterThanOrEqual(1);
        return rerolledDice;
      });
      expect(some(rerolls, r => r.length > 1)).toBe(true);
    });
  });
  // xdescribe('errors', () => {
  //   it("doesn't accept bad rolls", () => {
  //     expect(() => Roll.rerollDice(undefined, { reroll: [1] })).toThrow();
  //     expect(() => Roll.rerollDice('a', { reroll: [1] })).toThrow();
  //   });
  //   it("doesn't accept bad rerolls", () => {
  //     expect(() => Roll.rerollDice(1, { reroll: 1 })).toThrow();
  //     expect(() => Roll.rerollDice([1], { reroll: undefined })).toThrow();
  //     expect(() => Roll.rerollDice([1], { reroll: ['a'] })).toThrow();
  //   });
  //   it("doesn't accept 1-10 for reroll parameters", () => {
  //     expect(() => Roll.rerollDice(1, { reroll: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] })).toThrow();
  //   });
  // });
});

describe('roll', () => {
  it('should roll dice', () => {
    expect(Roll.roll({ dice: 0 })).toEqual({
      result: [],
      botch: false,
      successes: 0,
      diceRolled: 0,
      config: {
        dice: 0,
      },
      rerolls: [[]],
    });
    times(100, () => {
      const rolled = Roll.roll({ dice: 1 });
      expect(isArray(rolled.result)).toBe(true);
      expect(rolled.botch).toBe(rolled.result[0] === 1);
      expect(rolled.config.dice).toBe(1);
      expect(rolled.successes).toBe(rolled.result[0] === 10 ? 2 : rolled.result[0] >= 7 ? 1 : 0);
      expect(rolled.diceRolled).toBe(1);
    });
  });
  it('takes autosuccesses', () => {
    expect(Roll.roll({ dice: 0, autosuccesses: 2 })).toEqual({
      result: [],
      botch: false,
      successes: 2,
      diceRolled: 0,
      config: {
        dice: 0,
        autosuccesses: 2,
      },
      rerolls: [[]],
    });
  });
});
