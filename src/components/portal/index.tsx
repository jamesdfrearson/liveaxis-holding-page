"use client";

// Types
type Props = Readonly<{ children: React.ReactNode }>;

// React
import { useState, useEffect } from "react";

import { createPortal } from "react-dom";

export default function Portal({ children }: Props): React.ReactNode {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.querySelector("body")!)
    : null;
}
