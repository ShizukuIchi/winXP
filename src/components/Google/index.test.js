import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { render, fireEvent } from 'react-testing-library';
import Google from 'src/themes/Google';

it('Result hello without crashing', () => {
  const { container, getByAltText } = render(
    <HashRouter>
      <Route
        exact
        path="/"
        render={() => <Redirect to="/google/search?query=" />}
      />
      <Route component={Google} />
    </HashRouter>,
  );
  const input = container.querySelector('input');

  fireEvent.change(input, { target: { value: '' } });
  const button = getByAltText('find');
  button.click();
  fireEvent.change(input, { target: { value: '123' } });
  button.click();
  button.click();
  expect(container.innerHTML).toMatch(/123/);

  const logo = getByAltText('Google');
  logo.click();
});

it('Search hello without crashing', () => {
  const { container, getByValue } = render(
    <HashRouter>
      <Route render={props => <Google {...props} />} />
    </HashRouter>,
  );
  const input = getByValue('');
  const button = container.querySelector('#enter');
  button.click();
  fireEvent.change(input, { target: { value: '123' } });
  button.click();
});
