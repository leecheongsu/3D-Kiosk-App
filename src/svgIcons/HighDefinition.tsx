import React from 'react';

type Props = {
  color: string;
  [x: string]: any;
};

function HighDefinition({ color, ...rest }: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0.75" y1="6.75" x2="0.749999" y2="17.25" stroke={color} stroke-width="1.5" stroke-linecap="round" />
      <line x1="9.84082" y1="6.75" x2="9.84082" y2="17.25" stroke={color} stroke-width="1.5" stroke-linecap="round" />
      <line x1="0.75" y1="12.25" x2="9.25" y2="12.25" stroke={color} stroke-width="1.5" stroke-linecap="round" />
      <mask id="path-4-inside-1_1527_5047" fill="white">
        <path d="M14 7C14 6.44772 14.4477 6 15 6H18C21.3137 6 24 8.68629 24 12C24 15.3137 21.3137 18 18 18H15C14.4477 18 14 17.5523 14 17V7Z" />
      </mask>
      <path
        d="M14 7C14 6.44772 14.4477 6 15 6H18C21.3137 6 24 8.68629 24 12C24 15.3137 21.3137 18 18 18H15C14.4477 18 14 17.5523 14 17V7Z"
        stroke={color}
        stroke-width="3"
        stroke-linejoin="round"
        mask="url(#path-4-inside-1_1527_5047)"
      />
    </svg>
  );
}

export default HighDefinition;
