import React, { useState } from 'react';

function useDeviceDetect() {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    console.log(`user's device is : ${window.navigator.userAgent}`);
    const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;

    const mobile = Boolean(userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ));
    setIsMobile(mobile)

  }, []);
  return { isMobile };
}