import React from 'react';
import Topbar from './Topbar';

type Props = {
  children?: JSX.Element;
};

function index({ children }: Props) {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Topbar />
      {children}
    </div>
  );
}

export default index;
