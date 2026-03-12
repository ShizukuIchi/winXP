import React, { useEffect } from 'react';

function MessariResearch() {
  useEffect(() => {
    // Open the Messari Research page in a new tab
    window.open('https://messari.io/research/karim', '_blank', 'noopener,noreferrer');
  }, []);

  // This component doesn't need to render anything since it just opens a URL
  // Return null to render nothing
  return null;
}

export default MessariResearch; 