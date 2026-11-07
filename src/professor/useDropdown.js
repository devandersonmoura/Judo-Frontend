import { useEffect, useRef, useState } from 'react';

const GAP = 4;
const MENU_HEIGHT = 136;

// A tabela rola de lado e cortaria o menu: por isso ele usa posição fixa na tela.
function menuPosition(trigger) {
  const rect = trigger.getBoundingClientRect();
  const opensUp = rect.bottom + GAP + MENU_HEIGHT > window.innerHeight;
  return {
    left: rect.left,
    minWidth: rect.width,
    ...(opensUp ? { bottom: window.innerHeight - rect.top + GAP } : { top: rect.bottom + GAP }),
    transformOrigin: opensUp ? 'bottom' : 'top',
  };
}

export function useDropdown({ count, selectedIndex, onPick }) {
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const isOpen = position !== null;

  const close = () => setPosition(null);

  const open = () => {
    setActiveIndex(selectedIndex);
    setPosition(menuPosition(triggerRef.current));
  };

  const pick = (index) => {
    close();
    onPick(index);
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnOutsidePress = (event) => {
      const inside = [triggerRef, menuRef].some((ref) => ref.current?.contains(event.target));
      if (!inside) close();
    };

    document.addEventListener('pointerdown', closeOnOutsidePress);
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress);
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [isOpen]);

  const handleKeyDown = (event) => {
    const moves = {
      ArrowDown: (index) => Math.min(index + 1, count - 1),
      ArrowUp: (index) => Math.max(index - 1, 0),
      Home: () => 0,
      End: () => count - 1,
    };

    if (!isOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        open();
      }
      return;
    }

    if (moves[event.key]) {
      event.preventDefault();
      setActiveIndex(moves[event.key]);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      pick(activeIndex);
    } else if (event.key === 'Escape' || event.key === 'Tab') {
      close();
    }
  };

  return {
    triggerRef,
    menuRef,
    isOpen,
    position,
    activeIndex,
    setActiveIndex,
    toggle: () => (isOpen ? close() : open()),
    pick,
    handleKeyDown,
  };
}
