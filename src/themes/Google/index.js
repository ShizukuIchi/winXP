import React, { useState } from 'react';
import Search from './Search';
import Main from './Main';

function GoogleContainer() {
  const [state, setState] = useState({
    route: 'main',
    query: '',
  });
  function onSearch(str) {
    if (str.length) {
      setState({
        route: 'search',
        query: str,
      });
    }
  }
  function goMain() {
    setState({
      route: 'main',
      query: '',
    });
  }
  return (
    <Google
      route={state.route}
      query={state.query}
      onSearch={onSearch}
      goMain={goMain}
    />
  );
}

export function Google({ route = 'main', query = '', onSearch, goMain }) {
  if (route === 'main') return <Main onSearch={onSearch} />;
  else return <Search goMain={goMain} onSearch={onSearch} query={query} />;
}

export default GoogleContainer;
