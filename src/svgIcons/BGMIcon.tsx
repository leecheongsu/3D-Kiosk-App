import React from 'react';

type Props = {
  color: string;
  [x: string]: any;
};

function BGMIcon({ color, ...rest }: Props) {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.5 17.25C15.5 16.2835 16.2835 15.5 17.25 15.5H21V17.2C21 18.1941 20.1941 19 19.2 19H17.25C16.2835 19 15.5 18.2165 15.5 17.25Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <path
        d="M3.5 19.25C3.5 18.2835 4.2835 17.5 5.25 17.5H8.5V19.2C8.5 20.1941 7.6941 21 6.7 21H5.25C4.2835 21 3.5 20.2165 3.5 19.25Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <path d="M8.5 9.022L21 6.0625" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path
        d="M8.5 19V5L21 2V16.8462"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default BGMIcon;
