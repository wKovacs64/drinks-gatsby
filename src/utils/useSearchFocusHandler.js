import { useEffect, useRef } from 'react';

const has = Object.prototype.hasOwnProperty;

function invalidArgument(param) {
  return `${param} must be a ref attached to an element with a focus function`;
}

function useSearchFocusHandler({ isShowing, focusOnShow, focusOnHide }) {
  const firstRun = useRef(true);

  useEffect(() => {
    // Make sure the targets are refs
    if (!has.call(focusOnShow, 'current')) {
      throw new Error(invalidArgument`focusOnShow`);
    }
    if (!has.call(focusOnHide, 'current')) {
      throw new Error(invalidArgument`focusOnHide`);
    }

    // Don't mess with focus the first time this effect runs (e.g. on initial
    // page load)
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    // Make sure the refs are attached to focusable elements
    if (
      !focusOnShow.current ||
      typeof focusOnShow.current.focus !== 'function'
    ) {
      throw new Error(invalidArgument`focusOnShow`);
    }
    if (
      !focusOnHide.current ||
      typeof focusOnHide.current.focus !== 'function'
    ) {
      throw new Error(invalidArgument`focusOnHide`);
    }

    // Focus the appropriate element
    if (isShowing) {
      focusOnShow.current.focus();
    } else {
      focusOnHide.current.focus();
    }
  }, [isShowing, focusOnShow, focusOnHide]);
}

export default useSearchFocusHandler;
