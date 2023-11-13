import React from 'react';

type Props = {
  [x: string]: any;
};

function HideSweeps({ ...rest }: Props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <g filter="url(#filter0_d_1640_1225)">
        <path
          d="M12.0001 1.99805C17.5238 1.99805 22.0016 6.47589 22.0016 11.9996C22.0016 17.5233 17.5238 22.0011 12.0001 22.0011C6.47638 22.0011 1.99854 17.5233 1.99854 11.9996C1.99854 6.47589 6.47638 1.99805 12.0001 1.99805ZM12.0001 3.49805C7.30481 3.49805 3.49854 7.30432 3.49854 11.9996C3.49854 16.6949 7.30481 20.5011 12.0001 20.5011C16.6954 20.5011 20.5016 16.6949 20.5016 11.9996C20.5016 7.30432 16.6954 3.49805 12.0001 3.49805ZM11.9964 10.4986C12.3761 10.4984 12.6901 10.7803 12.74 11.1464L12.7469 11.2481L12.7505 16.7497C12.7508 17.1639 12.4152 17.5 12.001 17.5002C11.6213 17.5005 11.3073 17.2185 11.2574 16.8525L11.2505 16.7507L11.2469 11.2491C11.2467 10.8349 11.5822 10.4989 11.9964 10.4986ZM12.0005 7.00086C12.5521 7.00086 12.9992 7.44798 12.9992 7.99953C12.9992 8.55107 12.5521 8.99819 12.0005 8.99819C11.449 8.99819 11.0019 8.55107 11.0019 7.99953C11.0019 7.44798 11.449 7.00086 12.0005 7.00086Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1640_1225"
          x="-2.00146"
          y="-2.00195"
          width="28.0029"
          height="28.0039"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1640_1225" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1640_1225" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

export default HideSweeps;
