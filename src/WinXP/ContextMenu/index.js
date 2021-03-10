import React, { useState, useRef, useLayoutEffect } from 'react';
import ContextMenuList from './ContextMenuList';

function ContextMenu({ items, mousePos }) {
  const [refPos, setRefPos] = useState(null);
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    setRefPos(elementRef.current.getBoundingClientRect());
  }, []);

  return (
    <div ref={elementRef}>
      <ContextMenuList mousePos={mousePos} refPos={refPos} items={items} />
    </div>
  );
}

export default React.memo(ContextMenu);
