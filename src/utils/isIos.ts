const isIos = (): boolean => {
  if (
    navigator.userAgent.toLowerCase().indexOf("iphone") !== -1 ||
    navigator.userAgent.toLowerCase().indexOf("ipod") !== -1 ||
    navigator.userAgent.toLowerCase().indexOf("ipad") !== -1
  ) {
    return true;
  }
  return false;
};

export const isIpadOs = (): boolean => {
  if (navigator.userAgent.toLowerCase().indexOf("macintosh") !== -1 && navigator.maxTouchPoints > 0) {
    return true;
  }
  return false;
};
export const isSafari = (): boolean => {
  if (navigator.userAgent.toLowerCase().indexOf("chrome") === -1 && navigator.userAgent.toLowerCase().indexOf("safari") !== -1) {
    return true;
  }
  return false;
};

export default isIos;
