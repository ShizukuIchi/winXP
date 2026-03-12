import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0;
  background: white;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const AddressBar = styled.div`
  background: #f0f0f0;
  border-bottom: 1px solid #ccc;
  padding: 4px 8px;
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const AddressInput = styled.input`
  flex: 1;
  padding: 2px 4px;
  border: 1px inset #ccc;
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 11px;
  background: white;
`;

const IframeContainer = styled.div`
  flex: 1;
  position: relative;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

function Airdrop() {
  const url = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
  
  return (
    <Container>
      <AddressBar>
        <span>Address:</span>
        <AddressInput 
          type="text" 
          value="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
          readOnly 
        />
      </AddressBar>
      <IframeContainer>
        <StyledIframe
          src={url}
          title="Airdrop Surprise"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </IframeContainer>
    </Container>
  );
}

export default Airdrop; 