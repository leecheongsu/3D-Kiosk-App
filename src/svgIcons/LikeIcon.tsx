import React from 'react';

type Props = {
  color?: string;
  [x: string]: any;
};

function ViewIcon({ color = 'white', ...rest }: Props) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M26.9336 31.1579L30.9608 16.9079C31.2314 15.9506 30.5121 15 29.5173 15H20.906C20.3786 15 19.9882 14.5093 20.1068 13.9954L20.4814 12.3721C20.8251 10.883 20.9354 9.34972 20.8085 7.82685L20.7395 6.99952C20.6656 6.11201 20.2795 5.27944 19.6497 4.6497C19.0736 4.07363 18.2923 3.75 17.4776 3.75H17.2983C16.8055 3.75 16.3516 4.01712 16.1123 4.44782L14.1188 8.03618C13.2247 9.6456 11.8919 10.968 10.2757 11.8496L5.28173 14.5736C4.79983 14.8364 4.5 15.3415 4.5 15.8905V30.75C4.5 31.5784 5.17157 32.25 6 32.25H25.4902C26.1615 32.25 26.7511 31.804 26.9336 31.1579Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default ViewIcon;
