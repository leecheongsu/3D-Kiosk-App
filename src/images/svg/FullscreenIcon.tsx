import React from 'react';

type Props = {
  color: string;
  [x: string]: any;
};

function FullscreenIcon({ color, ...rest }: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3L8 7.94975" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M3 20.9498L8 16" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path
        d="M21.0005 20.9498L16.0508 16"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20.9498 3L16 7.94975"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M16.5 3H21V7.5" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M21 16.5V21H16.5" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M7.5 21H3V16.5" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M3 7.5V3H7.5" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}

export default FullscreenIcon;
