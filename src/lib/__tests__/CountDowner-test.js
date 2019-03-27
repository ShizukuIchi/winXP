import { sleep, CountDowner } from 'src/lib';

it('countdowner count 3', async () => {
  const now = new Date();
  now.setSeconds(now.getSeconds() + 3);
  const cd = new CountDowner(now);
  let count = 0;
  cd.on('second', () => count++);

  await new Promise(res => {
    cd.on('stop', res);
  });
  expect(count).toEqual(2);
});

it('countdowner progress', async () => {
  const now = new Date();
  now.setSeconds(now.getSeconds() + 1);
  const cd2 = new CountDowner(now);
  await sleep(750);
  const progress = cd2.progress();
  expect(progress).toBeWithin(0.74, 0.76);
});
it('countdowner progress exceed', async () => {
  const now = new Date();
  now.setSeconds(now.getSeconds() + 1);
  const cd = new CountDowner(now);
  await sleep(1100);
  const progress = cd.progress();
  expect(progress).toBe(1);
});

it('countdowner cb name error', () => {
  const cd = new CountDowner(new Date());
  expect(() => {
    cd.on('hello', console.log);
  }).toThrowError('no hello type callback');
});

it('countdowner get last times -1', async () => {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  const cd = new CountDowner(now);
  await sleep(900);
  expect(cd.getLast()).toEqual([0, 23, 59, 59]);
});
