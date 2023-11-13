const checkFlagInfinite = (
  flag: () => boolean,
  callback: () => void,
  callback2: () => void,
  interval: number = 200,
): void => {
  if (flag()) {
    callback();
    window.setTimeout(() => checkFlagInfinite(flag, callback, callback2, interval), interval);
  } else {
    callback2();
    window.setTimeout(() => checkFlagInfinite(flag, callback, callback2, interval), interval);
  }
};

export default checkFlagInfinite;
