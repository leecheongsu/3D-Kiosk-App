import React from 'react';

type Props = {
  color?: string;
  [x: string]: any;
};

function ViewIcon({ color = 'white', ...rest }: Props) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M33 5.25H3V27.75H8.25V31.5L15.75 27.75H33V5.25Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M23.25 12V12.75" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12.75 12V12.75" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path
        d="M23.25 17.75C23.25 17.75 21.75 20.75 18 20.75C14.25 20.75 12.75 17.75 12.75 17.75"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default ViewIcon;
