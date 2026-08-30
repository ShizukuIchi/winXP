import { useEffect } from 'react';

import mouseDownSrc from 'assets/sounds/mouse_down.mp3';
import mouseUpSrc from 'assets/sounds/mouse_up.mp3';

const downSound = new Audio(mouseDownSrc);
const upSound = new Audio(mouseUpSrc);

// Not fetched until the first click, so they cost nothing on load.
downSound.preload = 'none';
upSound.preload = 'none';

function play(sound) {
  // A single Audio element ignores play() while it is already playing, so a
  // fast second click would be silent without the rewind.
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function useClickSound(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    function onPointerDown(e) {
      if (e.pointerType === 'touch') return;
      play(downSound);
    }
    function onPointerUp(e) {
      if (e.pointerType === 'touch') return;
      play(upSound);
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointerup', onPointerUp);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointerup', onPointerUp);
    };
  }, [enabled]);
}

export default useClickSound;
