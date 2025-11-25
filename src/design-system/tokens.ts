import { colors } from './colors';
import { fonts, fontSize, lineHeight, letterSpacing, fontWeight } from './typography';
import { spacing } from './spacing';
import { sizes } from './sizing';
import { borderRadius } from './borderRadius';
import { shadows } from './shadows';

export const tokens = {
  colors,
  fontFamily: fonts.family,
  fontWeight: fonts.weight,
  fontSize: fonts.fontSize,
  lineHeight: fonts.lineHeight,
  letterSpacing: fonts.letterSpacing,
  spacing,
  sizes,
  borderRadius,
  boxShadow: shadows,
};
