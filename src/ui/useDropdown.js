import { useEffect, useRef, useState } from 'react';

const GAP = 4;
const OPTION_HEIGHT = 42;
const MAX_MENU_HEIGHT = 300;

// A tabela rola de lado e cortaria o menu: por isso ele usa posição fixa na tela.
function menuPosition(trigger, count) {
  const rect = trigger.getBoundingClientRect();
  const height = Math.min(count * OPTION_HEIGHT + 10, MAX_MENU_HEIGHT);
  const spaceBelow = window.innerHeight - rect.bottom - GAP;
  const opensUp = spaceBelow < height && rect.top > spaceBelow;
  const space = opensUp ? rect.top - GAP : spaceBelow;

  return {
    left: rect.left,
    minWidth: rect.width,
    maxHeight: Math.min(MAX_MENU_HEIGHT, space - GAP),
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
    setPosition(menuPosition(triggerRef.current, count));
  };

  const pick = (index) => {
    close();
    onPick(index);
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const isInsideMenu = (event) => menuRef.current?.contains(event.target);

    const closeOnOutsidePress = (event) => {
      if (!isInsideMenu(event) && !triggerRef.current?.contains(event.target)) close();
    };

    // Rolar a lista de opções não pode fechar o menu; rolar a página, sim.
    const closeOnPageScroll = (event) => {
      if (!isInsideMenu(event)) close();
    };

    document.addEventListener('pointerdown', closeOnOutsidePress);
    window.addEventListener('scroll', closeOnPageScroll, true);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress);
      window.removeEventListener('scroll', closeOnPageScroll, true);
      window.removeEventListener('resize', close);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) menuRef.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [isOpen, activeIndex]);

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
    } else if (event.key === 'Tab') {
      close();
    } else if (event.key === 'Escape') {
      // Dentro de um modal, o Esc fecha só o menu.
      event.preventDefault();
      event.stopPropagation();
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
