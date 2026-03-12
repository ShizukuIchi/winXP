import React, { useEffect } from 'react';

function Crypto4Gaza() {
  useEffect(() => {
    // Open the Crypto Gaza website in a new tab
    window.open('https://www.cryptogaza.com/', '_blank', 'noopener,noreferrer');
  }, []);

  // This component doesn't need to render anything since it just opens a URL
  // Return null to render nothing
  return null;
}

export default Crypto4Gaza; 