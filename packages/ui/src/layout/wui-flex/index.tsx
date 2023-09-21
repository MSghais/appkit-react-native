import { View, type ViewStyle } from 'react-native';

import type {
  FlexAlignItemsType,
  FlexDirectionType,
  FlexGrowType,
  FlexJustifyContentType,
  FlexShrinkType,
  FlexWrapType,
  SpacingType
} from '../../utils/TypesUtil';

import { UiUtil } from '../../utils/UiUtil';
import { Spacing } from '../../utils/ThemeUtil';

export interface FlexViewProps {
  children: React.ReactNode;
  flexDirection?: FlexDirectionType;
  flexWrap?: FlexWrapType;
  flexGrow?: FlexGrowType;
  flexShrink?: FlexShrinkType;
  alignItems?: FlexAlignItemsType;
  justifyContent?: FlexJustifyContentType;
  columnGap?: SpacingType;
  rowGap?: SpacingType;
  gap?: SpacingType;
  padding?: SpacingType | SpacingType[];
  margin?: SpacingType | SpacingType[];
}

export function FlexView(props: FlexViewProps) {
  const styles: ViewStyle = {
    flexDirection: props.flexDirection,
    flexWrap: props.flexWrap,
    flexGrow: props.flexGrow,
    flexShrink: props.flexShrink,
    alignItems: props.alignItems,
    justifyContent: props.justifyContent,
    columnGap: props.columnGap && Spacing[props.columnGap],
    rowGap: props.rowGap && Spacing[props.rowGap],
    gap: props.gap && Spacing[props.gap],
    paddingTop: props.padding && UiUtil.getSpacingStyles(props.padding, 0),
    paddingRight: props.padding && UiUtil.getSpacingStyles(props.padding, 1),
    paddingBottom: props.padding && UiUtil.getSpacingStyles(props.padding, 2),
    paddingLeft: props.padding && UiUtil.getSpacingStyles(props.padding, 3),
    marginTop: props.margin && UiUtil.getSpacingStyles(props.margin, 0),
    marginRight: props.margin && UiUtil.getSpacingStyles(props.margin, 1),
    marginBottom: props.margin && UiUtil.getSpacingStyles(props.margin, 2),
    marginLeft: props.margin && UiUtil.getSpacingStyles(props.margin, 3)
  };

  return <View style={styles}>{props.children}</View>;
}