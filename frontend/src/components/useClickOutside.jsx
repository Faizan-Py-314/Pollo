import { useEffect, useRef } from "react";

export function useClickOutside(isOpen, callback) {
  const elementRef = useRef(null);

  useEffect(() => {
    // Exit early if the menu isn't open—no event listener added!
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, callback]); // Re-subscribes dynamically when isOpen changes

  return elementRef;
}