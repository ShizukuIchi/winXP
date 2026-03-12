import React, { useEffect } from 'react';

function Telegram() {
  useEffect(() => {
    // Open Telegram link immediately in new tab
    window.open('https://t.me/karimhal', '_blank');
  }, []);

  // This component won't actually render anything visible
  // since it immediately opens a new tab
  return null;
}

export default Telegram; 