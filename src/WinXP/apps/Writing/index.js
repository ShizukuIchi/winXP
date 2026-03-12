import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0;
  background: white;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;

const IFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  background: white;
`;

const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: 'Tahoma', sans-serif;
  font-size: 12px;
  color: #666;
`;

function Writing() {
  const iframeRef = useRef(null);
  const mirrorUrl = 'https://mirror.xyz/%F0%9F%94%A5%F0%9F%94%A5%F0%9F%98%8E%F0%9F%94%A5%F0%9F%94%A5.eth';

  useEffect(() => {
    // Try to navigate to the Mirror URL
    if (iframeRef.current) {
      try {
        iframeRef.current.src = mirrorUrl;
      } catch (error) {
        console.log('iframe loading error:', error);
        // Fallback: open in new window
        window.open(mirrorUrl, '_blank');
      }
    }
  }, [mirrorUrl]);

  const handleIframeError = () => {
    // If iframe fails to load due to CORS, open in new window
    window.open(mirrorUrl, '_blank');
  };

  return (
    <Container>
      <IFrame
        ref={iframeRef}
        src={mirrorUrl}
        title="Karim's Writing on Mirror"
        onError={handleIframeError}
        sandbox="allow-scripts allow-same-origin allow-navigation"
      />
    </Container>
  );
}

export default Writing; 