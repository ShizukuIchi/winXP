import React, { useState } from 'react';
import { render, fireEvent } from 'react-testing-library';

import {
  useResettableTimeout,
  useMediaStyles,
  useMeta,
  useSafariNotScale,
} from 'src/hooks';
import { sleep } from 'src/lib';

function TestTimeout() {
  const reset = useResettableTimeout(1000, add, 2);
  useResettableTimeout();
  const [count, setCount] = useState(0);
  function add(n) {
    setCount(count => count + n);
  }
  return <div onClick={reset}>{count}</div>;
}

function TestMediaStyles() {
  const style = useMediaStyles({
    test: 'test',
  });
  return style;
}

function TestMeta() {
  useMeta('test', {
    test: 'testtest',
    noTest: 'noTest',
  });
  return 'test';
}

it('useTimeout', async () => {
  const { container } = render(<TestTimeout />);
  expect(container.innerHTML).toMatch(/0/);
  await sleep(600);
  container.querySelector('div').click();
  await sleep(600);
  expect(container.innerHTML).toMatch(/0/);
  await sleep(600);
  expect(container.innerHTML).toMatch(/2/);
});

it('useMediaStyles', () => {
  render(<TestMediaStyles />);
});

it('useMeta', () => {
  const meta = document.createElement('meta');
  document.head.appendChild(meta);
  meta.setAttribute('test', 'test');
  meta.setAttribute('name', 'test');
  const { unmount } = render(<TestMeta />);
  expect(meta.getAttribute('noTest')).toBe('noTest');
  expect(meta.getAttribute('test')).toBe('testtest');
  unmount();
  expect(meta.getAttribute('noTest')).toBe(null);
  expect(meta.getAttribute('test')).toBe('test');
  meta.remove();
  render(<TestMeta />);
});
