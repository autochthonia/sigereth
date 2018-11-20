import { union, mapValues, mapKeys, isObject, get, omit } from 'lodash';

import { mq as mediaQueries } from './const';
import { MqObject } from 'styles';

export const keysMatch = (...objects: {}[]) => {
  const allKeys = objects.reduce((keys: string[], object) => keys.concat(Object.keys(object)), []) as string[];
  const keyUnion = union(allKeys);
  return objects.every(object => keyUnion.length === Object.keys(object).length);
};

export const someKeysMatch = (...objects: {}[]) => {
  const allKeys = objects.reduce((keys: string[], object: {}) => keys.concat(Object.keys(object)), []) as string[];
  const keyUnion = union(allKeys);
  return objects.some(object => keyUnion.length === Object.keys(object).length);
};

/**
 * Converts an object to media query by breakpoint. Usage:
 * mapValuesAndKeys({ sm: 1, md: 2, lg: 3, xl: 4, overwriteSmall: false }, zIndex => ({ zIndex }))
 * @param {object} mqObj media query object with definitions for each breakpoint
 * @param {function} createValues the function that maps values at each breakpoint to our css mqs (value, key, object) => outputted css
 * @param {object} mq css mq to use (doesn't usually need to be changed)
 * @param {function} createKeys how to create our mq keys (doesn't usually need to be changed)
 * @param {boolean} overwriteSmall whether to overwrite sm values with xl
 */
export const mapValuesAndKeys = (
  mqObj: MqObject<any>,
  createValues = (css: {}) => css,
  mq = mediaQueries,
  createKeys = (_v: any, k: 'sm' | 'md' | 'lg' | 'xl') => mq[k],
  overwriteSmall = get(mqObj, 'overwriteSmall', true),
) => {
  // Remove overwriteSmall key nondestructively
  const obj = omit(mqObj, 'overwriteSmall');
  if (!keysMatch(obj, mq)) {
    throw new Error(
      `mapValuesAndKeys - keys in obj and mq don't match: ${Object.keys(obj)} !== ${Object.keys(
        mq,
      )}`,
    );
  }

  // Create new values at each of our breakpoints
  const values = mapValues(obj, createValues);
  if (!isObject(values)) {
    console.warn('mapValuesAndKeys: values should be an object if you want it to do anything');
  } else if (overwriteSmall && values.sm) {
    values.sm = values.xl;
  }
  // Replace each key with the media query at each breakpoint
  return mapKeys(values, createKeys);
};
