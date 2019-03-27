import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Ubuntu from 'src/themes/Ubuntu';

import { sleep } from 'src/lib';

it('Ubuntu without crashing', async () => {
  const { container, getByValue } = render(
    <Ubuntu hintTimeout={100} idleTimeout={100} />,
  );
  await sleep(1000);
  container.querySelector('#cancel').click();
  const submit = container.querySelector('#sign-in');
  const input = getByValue('');
  submit.click();
  fireEvent.change(input, {
    target: {
      value: '123',
    },
  });
  fireEvent.keyDown(input, {});
  expect(container.innerHTML).not.toMatch(/Wrong/);
  fireEvent.keyDown(input, {
    key: 'Enter',
  });
  expect(container.innerHTML).toMatch(/Wrong/);
  await sleep(200);
  expect(container.innerHTML).not.toMatch(/Wrong/);
});

it('Login Page works like a charm', () => {
  const { container, getByAltText } = render(<Ubuntu />);
  expect(container.innerHTML).toMatch(/User/);
  getByAltText('settings').click();
  const item1 = container.querySelector('.item');
  expect(item1.querySelector('.circle').style.visibility).toBe('visible');
  item1.click();
  const item2 = container.querySelector('.item:nth-child(2)');
  item2.click();
  expect(item1.querySelector('.circle').style.visibility).toBe('hidden');
  container.click();
});
