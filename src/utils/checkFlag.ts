const checkFlag = (flag: () => boolean, callback: () => void, interval: number = 200, maxTime = 9999999): void => {
  if (maxTime < 0) return;
  if (flag()) {
    callback();
  } else {
    window.setTimeout(() => checkFlag(flag, callback, interval, maxTime - interval), interval);
  }
};

export default checkFlag;
