import React from 'react';

type Props = {
  children?: JSX.Element;
};

function index({ children }: Props) {
  return <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>{children}</div>;
}

export default index;
