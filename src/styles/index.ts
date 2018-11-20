import { StandardLonghandProperties, StandardShorthandProperties } from 'csstype';
// @ts-ignore
import { all as cssProperties } from 'known-css-properties';
import { isObject } from 'lodash';
import { mapValuesAndKeys } from './util';

// Setup for our media breakpoints. Will move once system is built out a bit more
export interface MqObject<T> {
  sm: T;
  md: T;
  lg: T;
  xl: T;
}

// Mapped type that extends StandardLonghandProperties with responsive notation
// still in testing
export type ExtendedStandardLonghandProperties = {
  [P in keyof StandardLonghandProperties<number>]?:
    | StandardLonghandProperties<number>[P]
    | MqObject<StandardLonghandProperties<number>[P]>
};
export type ExtendedStandardShorthandProperties = {
  [P in keyof StandardShorthandProperties<number>]?:
    | StandardShorthandProperties<number>[P]
    | MqObject<StandardShorthandProperties<number>[P]>
};
export interface ExtendedStandardProperties
  extends ExtendedStandardLonghandProperties,
    ExtendedStandardShorthandProperties {}

const cssPropertiesNoDashes: string[] = cssProperties.map((key: string) => key.replace('-', ''));

// If provided with a MqObject, output MQ css, otherwise just output the key-value pair
// TODO rename
export const transformCss = (key: string, value: any) => {
  // To normalize css property names and css-in-js property names,
  // remove all dashes and transform to lowercase
  if (!cssPropertiesNoDashes.includes(key.toLowerCase())) {
    // If we don't expect the key to be filtered, print out a warning
    if (!['theme', 'children', 'onClick', 'href'].includes(key)) {
      console.warn(`transformCss has ignored unknown property: '${key}'`);
    }
    return undefined;
  }
  if (isObject(value)) {
    // TODO convert mapValuesAndKeys to ts
    return mapValuesAndKeys(value, (v: string | number) => ({ [key]: v }));
  }
  return { [key]: value };
};