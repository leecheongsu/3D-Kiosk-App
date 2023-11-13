import React from 'react';

type Props = {
  color?: string;
  [x: string]: any;
};

function MenuOpenIcon({ color = '#27364B', ...rest }: Props) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        d="M12.2676 15.794C11.9677 16.0797 11.493 16.0681 11.2073 15.7682L6.20597 10.5178C5.93004 10.2281 5.93004 9.77284 6.20597 9.48318L11.2073 4.23271C11.493 3.93279 11.9677 3.92125 12.2676 4.20694C12.5676 4.49264 12.5791 4.96737 12.2934 5.26729L7.78483 10.0005L12.2934 14.7336C12.5791 15.0336 12.5676 15.5083 12.2676 15.794Z"
        fill={color}
      />
    </svg>
  );
}

export default MenuOpenIcon;
