import React, { useEffect } from 'react';

function Email() {
  useEffect(() => {
    // Open default email app with mailto link
    window.location.href = 'mailto:karim@ngmilabs.com';
  }, []);

  // This component won't actually render anything visible
  // since it immediately opens the email app
  return null;
}

export default Email; 