import {
  ListStyleProperty,
  ListStyleTypeProperty,
  ListStyleImageProperty,
  ListStylePositionProperty,
} from 'csstype';

export interface ListCss {
  listStyle?: ListStyleProperty;
  listStyleType?: ListStyleTypeProperty;
  listStyleImage?: ListStyleImageProperty;
  listStylePosition?: ListStylePositionProperty;
}

export default ({ listStyle, listStyleType, listStyleImage, listStylePosition }: ListCss) => ({
  listStyle,
  listStyleType,
  listStyleImage,
  listStylePosition,
});
