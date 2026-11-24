"use client";

import {
  createContext,
  useContext,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import type { FreePostKind } from "@/content/free-posting";

const DeskPostContext = createContext<Record<FreePostKind, string | null> | null>(
  null,
);

export function DeskPostProvider({
  hrefs,
  children,
}: {
  hrefs: Record<FreePostKind, string | null>;
  children: ReactNode;
}) {
  return (
    <DeskPostContext.Provider value={hrefs}>{children}</DeskPostContext.Provider>
  );
}

export function DeskPostAnchor({
  kind,
  className,
  children,
  onClick,
}: {
  kind: FreePostKind;
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  const hrefs = useContext(DeskPostContext);
  const href = hrefs?.[kind];
  if (!href) return null;
  return (
    <a href={href} className={className} data-free-post={kind} onClick={onClick}>
      {children}
    </a>
  );
}
