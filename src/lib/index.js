export { default as CountDowner } from './CountDowner';

export const sleep = ms => new Promise(res => setTimeout(res, ms));
export const genID = () => {
  let id = 0;
  return () => id++;
};

export const isStr = str => testStr => str === testStr;
export const twoDigits = n => (n < 10 && n >= 0 ? '0' : '') + n;
export function getDayStr(d) {
  return 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(',')[
    d
  ];
}

export function getMonthStr(m) {
  return 'January,February,March,April,May,June,July,August,September,October,November,December'.split(
    ',',
  )[m];
}

export function choose(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
