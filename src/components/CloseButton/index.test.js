import React from 'react';
import { render } from 'react-testing-library';
import CloseButton, { isDark, getColor } from './index';
import { HashRouter, Route, Redirect } from 'react-router-dom';

it('CloseButton render without crashing', () => {
  const { container } = render(
    <HashRouter>
      <CloseButton location={{ pathname: '/' }} />
    </HashRouter>,
  );
  const button = container.querySelector('button');
  button.click();
});

it('CloseButton render no match without crashing ', () => {
  const { container } = render(
    <HashRouter>
      <Route exact path="/" render={() => <Redirect to="/no-match" />} />
      <CloseButton location={{ pathname: '/no-match' }} />
    </HashRouter>,
  );
  container.querySelector('button').click();
  expect(container.style.opacity === 0);
});

it('define if bg is dark', () => {
  expect(isDark('/macOS')).toBeTrue();
  expect(isDark('/win10-crash')).toBeFalse();
});

it('get right background color', () => {
  expect(getColor({ dark: true })).toBe('white');
  expect(getColor({ dark: false })).toBe('rgb(22, 22, 22)');
});
