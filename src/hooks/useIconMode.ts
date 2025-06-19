import { RefObject, useEffect, useState } from 'react';

/**
 * Determines whether a button should display in icon-only mode based on its width
 * relative to the viewport. If the button takes more than 18% of the page width,
 * icon mode is enabled.
 * @param ref React ref of the button element
 */
export default function useIconMode(ref: RefObject<HTMLElement>): boolean {
  const [iconMode, setIconMode] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      if (ref.current) {
        const { width } = ref.current.getBoundingClientRect();
        setIconMode(width / window.innerWidth > 0.18);
      }
    };

    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, [ref]);

  return iconMode;
}
