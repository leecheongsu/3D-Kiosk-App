import React from 'react';

type Props = {
  [x: string]: any;
};

function HideSweeps({ ...rest }: Props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <g opacity="0.6">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4.6665 12.0004C4.6665 15.6824 7.94964 18.6671 11.9998 18.6671C16.05 18.6671 19.3332 15.6824 19.3332 12.0004C19.3332 8.31841 16.05 5.33374 11.9998 5.33374C7.94964 5.33374 4.6665 8.31841 4.6665 12.0004ZM5.99984 12.0004C5.99984 14.946 8.68604 17.3337 11.9998 17.3337C15.3136 17.3337 17.9998 14.946 17.9998 12.0004C17.9998 9.05481 15.3136 6.66707 11.9998 6.66707C8.68604 6.66707 5.99984 9.05481 5.99984 12.0004Z"
          fill="white"
        />
      </g>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21.293 22.7072L1.29297 2.70718L2.70718 1.29297L22.7072 21.293L21.293 22.7072Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1 12C1 17.523 5.9247 22 12 22C18.0753 22 23 17.523 23 12C23 6.477 18.0753 2 12 2C5.9247 2 1 6.477 1 12ZM3 12C3 16.4184 7.0293 20 12 20C16.9707 20 21 16.4184 21 12C21 7.5816 16.9707 4 12 4C7.0293 4 3 7.5816 3 12Z"
        fill="white"
      />
    </svg>
  );
}

export default HideSweeps;
