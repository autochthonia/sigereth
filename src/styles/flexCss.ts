import {
  AlignContentProperty,
  DisplayProperty,
  AlignItemsProperty,
  AlignSelfProperty,
  FlexProperty,
  FlexBasisProperty,
  FlexDirectionProperty,
  FlexFlowProperty,
  GlobalsNumber,
  FlexWrapProperty,
  JustifyContentProperty,
  PlaceContentProperty,
} from 'csstype';

export interface FlexCss {
  display?: DisplayProperty;
  alignContent?: AlignContentProperty;
  alignItems?: AlignItemsProperty;
  alignSelf?: AlignSelfProperty;
  flex?: FlexProperty<string | 0>;
  flexBasis?: FlexBasisProperty<string | 0>;
  flexDirection?: FlexDirectionProperty;
  flexFlow?: FlexFlowProperty;
  flexGrow?: GlobalsNumber | GlobalsNumber[];
  flexShrink?: GlobalsNumber | GlobalsNumber[];
  flexWrap?: FlexWrapProperty;
  justifyContent?: JustifyContentProperty;
  order?: GlobalsNumber;
  placeContent?: PlaceContentProperty;
}

export default ({
  display = 'flex',
  alignContent,
  alignItems,
  alignSelf,
  flex,
  flexBasis,
  flexDirection,
  flexFlow,
  flexGrow,
  flexShrink,
  flexWrap,
  justifyContent,
  order,
  placeContent,
}: FlexCss) => ({
  display,
  alignContent,
  alignItems,
  alignSelf,
  flex,
  flexBasis,
  flexDirection,
  flexFlow,
  flexGrow,
  flexShrink,
  flexWrap,
  justifyContent,
  order,
  placeContent,
});
