import React from 'react';

type Props = {
  color?: string;
  [x: string]: any;
};

function ViewIcon({ color = 'white', ...rest }: Props) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <g clip-path="url(#clip0_1774_7292)">
        <path d="M36 0H0V36H36V0Z" fill={color} fill-opacity="0.01" />
        <path
          d="M18 15C20.8995 15 23.25 12.6495 23.25 9.75C23.25 6.85051 20.8995 4.5 18 4.5C15.1005 4.5 12.75 6.85051 12.75 9.75C12.75 12.6495 15.1005 15 18 15Z"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9 5.44141C7.63987 6.39012 6.75 7.9663 6.75 9.7504C6.75 11.6601 7.7697 13.3317 9.2943 14.2504"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M27 5.44141C28.3601 6.39012 29.25 7.9663 29.25 9.7504C29.25 11.5344 28.3601 13.1107 27 14.0594"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9 30V31.5H27V30C27 27.2044 27 25.8065 26.5432 24.7039C25.9343 23.2337 24.7663 22.0657 23.2961 21.4567C22.1935 21 20.7956 21 18 21C15.2044 21 13.8065 21 12.7039 21.4567C11.2337 22.0657 10.0657 23.2337 9.45675 24.7039C9 25.8065 9 27.2044 9 30Z"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M33.0007 31.5004V30.6004C33.0007 27.2401 33.0007 25.5599 32.3468 24.2764C31.7715 23.1475 30.8536 22.2295 29.7246 21.6543"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3 31.5004V30.6004C3 27.2401 3 25.5599 3.65396 24.2764C4.2292 23.1475 5.14709 22.2295 6.27605 21.6543"
          stroke={color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1774_7292">
          <rect width="36" height="36" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
}

export default ViewIcon;
