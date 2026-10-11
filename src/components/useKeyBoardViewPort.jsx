
import { useEffect, useState } from "react";

export function useKeyboardViewport() {
  const [height, setHeight] = useState(
    () => window.visualViewport?.height ?? window.innerHeight
  );

  useEffect(() => {
    const viewport = window.visualViewport;

    if (!viewport) return;

    const updateHeight = () => {
      setHeight(viewport.height);
    };

    viewport.addEventListener("resize", updateHeight);
    viewport.addEventListener("scroll", updateHeight);

    return () => {
      viewport.removeEventListener("resize", updateHeight);
      viewport.removeEventListener("scroll", updateHeight);
    };
  }, []);

  return height;
}
