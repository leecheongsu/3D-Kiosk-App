import React from 'react';

type Props = {
  color?: string;
  [x: string]: any;
};

function PauseIcon({ color = '#27364B', ...rest }: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M10 5.5C10 4.67157 9.32843 4 8.5 4H6.5C5.67157 4 5 4.67157 5 5.5V18.5C5 19.3284 5.67157 20 6.5 20H8.5C9.32843 20 10 19.3284 10 18.5V5.5ZM19 5.5C19 4.67157 18.3284 4 17.5 4H15.5C14.6716 4 14 4.67157 14 5.5V18.5C14 19.3284 14.6716 20 15.5 20H17.5C18.3284 20 19 19.3284 19 18.5V5.5Z"
        fill={color}
      />
    </svg>
  );
}

export default PauseIcon;
