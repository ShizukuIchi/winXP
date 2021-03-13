import React from 'react';
import styled from 'styled-components';

import ContextMenuItem from './ContextMenuItem';

function ContextMenuList({ parentRef, items }) {
  return (
    <StyledContextList>
      {items &&
        items.map((item, index) => (
          <ContextMenuItem
            key={index}
            item={item}
            index={index}
            parentRef={parentRef}
          />
        ))}
    </StyledContextList>
  );
}

const StyledContextList = styled.div`
  font-size: 12px;
  line-height: 1.5;
  background: #fff;
  padding: 2px;
  color: black;
`;

export default ContextMenuList;
