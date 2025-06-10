import React from 'react';
import Svg, { Path, Circle, G } from 'react-native-svg';

export const CloudIcon = ({ size = 48 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Path d="M36 36H14C9.58 36 6 32.42 6 28.5C6 24.58 9.58 21 14 21C14.42 21 14.83 21.03 15.24 21.09C16.67 17.64 20.01 15 24 15C28.42 15 32 18.13 32.7 22.19C32.8 22.13 32.9 22.09 33 22.09C36.31 22.09 39 24.78 39 28.09C39 31.4 36.31 34.09 33 34.09H32.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

export const RainIcon = ({ size = 48 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Path d="M36 36H14C9.58 36 6 32.42 6 28.5C6 24.58 9.58 21 14 21C14.42 21 14.83 21.03 15.24 21.09C16.67 17.64 20.01 15 24 15C28.42 15 32 18.13 32.7 22.19C32.8 22.13 32.9 22.09 33 22.09C36.31 22.09 39 24.78 39 28.09C39 31.4 36.31 34.09 33 34.09H32.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M18 40V44" stroke="#4FC3F7" strokeWidth="2.5" strokeLinecap="round"/>
    <Path d="M24 40V44" stroke="#4FC3F7" strokeWidth="2.5" strokeLinecap="round"/>
    <Path d="M30 40V44" stroke="#4FC3F7" strokeWidth="2.5" strokeLinecap="round"/>
  </Svg>
);

export const SunIcon = ({ size = 48 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Circle cx="24" cy="24" r="10" stroke="#fff" strokeWidth="2.5" fill="#FFD600"/>
    <Path d="M24 4V10" stroke="#FFD600" strokeWidth="2.5" strokeLinecap="round"/>
    <Path d="M24 38V44" stroke="#FFD600" strokeWidth="2.5" strokeLinecap="round"/>
    <Path d="M4 24H10" stroke="#FFD600" strokeWidth="2.5" strokeLinecap="round"/>
    <Path d="M38 24H44" stroke="#FFD600" strokeWidth="2.5" strokeLinecap="round"/>
    <Path d="M10.93 10.93L15.36 15.36" stroke="#FFD600" strokeWidth="2.5" strokeLinecap="round"/>
    <Path d="M32.64 32.64L37.07 37.07" stroke="#FFD600" strokeWidth="2.5" strokeLinecap="round"/>
    <Path d="M10.93 37.07L15.36 32.64" stroke="#FFD600" strokeWidth="2.5" strokeLinecap="round"/>
    <Path d="M32.64 15.36L37.07 10.93" stroke="#FFD600" strokeWidth="2.5" strokeLinecap="round"/>
  </Svg>
);

export const WindIcon = ({ size = 28 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <Path d="M4 14H20C22.21 14 24 15.79 24 18C24 20.21 22.21 22 20 22C17.79 22 16 20.21 16 18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    <Path d="M4 8H14C15.66 8 17 9.34 17 11C17 12.66 15.66 14 14 14" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

export const ThermometerIcon = ({ size = 28 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <Path d="M14 4V18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    <Circle cx="14" cy="21" r="3" stroke="#fff" strokeWidth="2" fill="#4FC3F7"/>
  </Svg>
);

export const UvIcon = ({ size = 28 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <Circle cx="14" cy="14" r="6" stroke="#fff" strokeWidth="2" fill="#FFD600"/>
    <Path d="M14 2V6" stroke="#FFD600" strokeWidth="2" strokeLinecap="round"/>
    <Path d="M14 22V26" stroke="#FFD600" strokeWidth="2" strokeLinecap="round"/>
    <Path d="M2 14H6" stroke="#FFD600" strokeWidth="2" strokeLinecap="round"/>
    <Path d="M22 14H26" stroke="#FFD600" strokeWidth="2" strokeLinecap="round"/>
  </Svg>
);

export const PressureIcon = ({ size = 28 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <Path d="M14 4V24" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
    <Circle cx="14" cy="14" r="10" stroke="#fff" strokeWidth="2"/>
  </Svg>
);

export const HamburgerIcon = ({ size = 28 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 28 28">
    <Path d="M4 7h16a1.25 1.25 0 0 1 0 2.5H4A1.25 1.25 0 0 1 4 7zm0 6h12a1.25 1.25 0 0 1 0 2.5H4A1.25 1.25 0 0 1 4 13z" fill="#333" />
  </Svg>
);

export const MoreIcon = ({ size = 28 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 28 28">
    <Circle cx="6" cy="14" r="1.5" fill="#333" />
    <Circle cx="14" cy="14" r="1.5" fill="#333" />
    <Circle cx="22" cy="14" r="1.5" fill="#333" />
  </Svg>
); 