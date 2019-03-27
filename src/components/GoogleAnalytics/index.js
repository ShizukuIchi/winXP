import { useEffect } from 'react';
import ga from 'react-ga';

function GoogleAnalytics({ location }) {
  useEffect(() => {
    ga.initialize('UA-135148027-3');
  }, []);
  useEffect(() => {
    ga.pageview(`fake-screen${location.pathname}`);
  }, [location.pathname]);
  return null;
}

export default GoogleAnalytics;
