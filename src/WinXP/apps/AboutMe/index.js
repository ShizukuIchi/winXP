import React from 'react';
import styled from 'styled-components';
import bioData from '../../../data/bio.json';

const Container = styled.div`
  padding: 8px;
  background: white;
  font-family: 'Courier New', monospace;
  height: 100%;
  overflow-y: auto;
  border: none;
`;

const TextContent = styled.pre`
  margin: 0;
  font-size: 13.2px;
  font-weight: bold;
  line-height: 1.4;
  color: #000;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

function AboutMe() {
  return (
    <Container>
      <TextContent>{bioData.bio}</TextContent>
    </Container>
  );
}

export default AboutMe; 