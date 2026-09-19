"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
