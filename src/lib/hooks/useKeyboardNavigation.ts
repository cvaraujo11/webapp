'use client';

import { useEffect, useRef, useState } from 'react';

export enum NavigationDirection {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
  BOTH = 'both',
}

interface UseKeyboardNavigationProps {
  containerRef: React.RefObject<HTMLElement>;
  itemSelector: string;
  direction?: NavigationDirection;
  loop?: boolean;
  initialIndex?: number;
  onSelect?: (element: HTMLElement, index: number) => void;
  onEscape?: () => void;
}

/**
 * Hook para facilitar navegação por teclado em listas, menus, etc.
 */
export function useKeyboardNavigation({
  containerRef,
  itemSelector,
  direction = NavigationDirection.VERTICAL,
  loop = true,
  initialIndex = -1,
  onSelect,
  onEscape,
}: UseKeyboardNavigationProps) {
  const [focusedIndex, setFocusedIndex] = useState(initialIndex);
  const itemsRef = useRef<HTMLElement[]>([]);

  // Função para atualizar a referência dos itens
  const updateItemsRef = () => {
    if (!containerRef.current) return [];
    
    const items = Array.from(
      containerRef.current.querySelectorAll(itemSelector)
    ) as HTMLElement[];
    
    itemsRef.current = items;
    return items;
  };

  // Gerenciador de eventos de teclado
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!containerRef.current) return;
    
    const items = updateItemsRef();
    if (items.length === 0) return;
    
    let newIndex = focusedIndex;
    
    switch (e.key) {
      case 'ArrowDown':
        if (direction === NavigationDirection.VERTICAL || direction === NavigationDirection.BOTH) {
          e.preventDefault();
          if (focusedIndex < items.length - 1) {
            newIndex = focusedIndex + 1;
          } else if (loop) {
            newIndex = 0;
          }
        }
        break;
        
      case 'ArrowUp':
        if (direction === NavigationDirection.VERTICAL || direction === NavigationDirection.BOTH) {
          e.preventDefault();
          if (focusedIndex > 0) {
            newIndex = focusedIndex - 1;
          } else if (loop) {
            newIndex = items.length - 1;
          }
        }
        break;
        
      case 'ArrowRight':
        if (direction === NavigationDirection.HORIZONTAL || direction === NavigationDirection.BOTH) {
          e.preventDefault();
          if (focusedIndex < items.length - 1) {
            newIndex = focusedIndex + 1;
          } else if (loop) {
            newIndex = 0;
          }
        }
        break;
        
      case 'ArrowLeft':
        if (direction === NavigationDirection.HORIZONTAL || direction === NavigationDirection.BOTH) {
          e.preventDefault();
          if (focusedIndex > 0) {
            newIndex = focusedIndex - 1;
          } else if (loop) {
            newIndex = items.length - 1;
          }
        }
        break;
        
      case 'Home':
        e.preventDefault();
        newIndex = 0;
        break;
        
      case 'End':
        e.preventDefault();
        newIndex = items.length - 1;
        break;
        
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < items.length) {
          onSelect?.(items[focusedIndex], focusedIndex);
        }
        return;
        
      case 'Escape':
        e.preventDefault();
        onEscape?.();
        return;
        
      default:
        return;
    }
    
    // Atualizar foco
    if (newIndex !== focusedIndex) {
      setFocusedIndex(newIndex);
      items[newIndex]?.focus();
    }
  };

  // Configurar os ouvintes de eventos
  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('keydown', handleKeyDown);
      
      // Inicializar itens e definir foco inicial se especificado
      const items = updateItemsRef();
      if (initialIndex >= 0 && initialIndex < items.length) {
        setFocusedIndex(initialIndex);
        items[initialIndex]?.focus();
      }
    }
    
    return () => {
      currentContainer?.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef.current, itemSelector, direction, loop, initialIndex]);

  // Método para focar um item específico
  const focusItem = (index: number) => {
    const items = updateItemsRef();
    if (index >= 0 && index < items.length) {
      setFocusedIndex(index);
      items[index]?.focus();
    }
  };

  return {
    focusedIndex,
    focusItem,
    updateItemsRef,
  };
}

export default useKeyboardNavigation; 