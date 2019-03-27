import {
  sleep,
  genID,
  isStr,
  twoDigits,
  getDayStr,
  getMonthStr,
} from 'src/lib';

it('sleep lib', async () => {
  const now = new Date();
  await sleep(1000);
  expect(new Date() - now >= 1000);
});

it('genID', () => {
  const getID = genID();
  expect([getID(), getID(), getID()]).toEqual([0, 1, 2]);
});

it('isPath', () => {
  const isA = isStr('A');
  expect(isA('A')).toBeTrue();
  expect(isStr('A')('B')).toBeFalse();
});

it('fix number to two digits', () => {
  expect(twoDigits(1)).toBe('01');
  expect(twoDigits(10)).toBe('10');
  expect(twoDigits(-1)).toBe('-1');
});

it('get correct day string', () => {
  expect(getDayStr(1)).toBe('Monday');
  expect(getDayStr(8)).toThrowErrorMatchingSnapshot();
});

it('get correct Month string', () => {
  expect(getMonthStr(1)).toBe('February');
  expect(getMonthStr(-1)).toThrowErrorMatchingSnapshot();
});
