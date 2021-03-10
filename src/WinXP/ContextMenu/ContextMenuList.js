import React from 'react';
import styled from 'styled-components';

import ContextMenuItem from './ContextMenuItem';

function ContextMenuList({ mousePos, refPos, items }) {
  console.log('mousePos', mousePos);
  console.log('refPos', refPos);

  return (
    <StyledContextList>
      {items &&
        items.map((item, index) => (
          <ContextMenuItem key={index} item={item} index={index} />
        ))}
    </StyledContextList>
  );
}

const StyledContextList = styled.div`
  position: absolute;
  left: 1000px; //calculate position
  top: 100px; //calculate position
  z-index: 1;
  font-size: 12px;
  line-height: 1.5;
  border: 1px solid darkgray;
  background: #fff;
  padding: 2px;
  color: black;
`;

export default ContextMenuList;
