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
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const { width } = el.getBoundingClientRect();
      setIconMode(width / window.innerWidth > 0.18);
    };

    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener('resize', update);

    update();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [ref]);

  return iconMode;
}
