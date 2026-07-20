"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
  type ReactNode,
} from "react";
import {
  clearBwgState,
  defaultState,
  loadBwgState,
  saveBwgState,
  type BwgPersistedState,
} from "@/lib/guides/bwg-readiness-storage";

type BwgContextValue = {
  state: BwgPersistedState;
  hydrated: boolean;
  setState: (
    updater:
      | BwgPersistedState
      | ((prev: BwgPersistedState) => BwgPersistedState),
  ) => void;
  clearAll: () => void;
};

const BwgContext = createContext<BwgContextValue | null>(null);

export function BwgStateProvider({ children }: { children: ReactNode }) {
  const [state, setStateRaw] = useState<BwgPersistedState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  const onHydrate = useEffectEvent(() => {
    setStateRaw(loadBwgState());
    setHydrated(true);
  });

  useEffect(() => {
    onHydrate();
  }, []);

  const persist = useEffectEvent((next: BwgPersistedState) => {
    saveBwgState(next);
  });

  useEffect(() => {
    if (!hydrated) return;
    persist(state);
  }, [state, hydrated]);

  const setState = useCallback(
    (
      updater:
        | BwgPersistedState
        | ((prev: BwgPersistedState) => BwgPersistedState),
    ) => {
      setStateRaw((prev) =>
        typeof updater === "function" ? updater(prev) : updater,
      );
    },
    [],
  );

  const clearAll = useCallback(() => {
    clearBwgState();
    setStateRaw(defaultState());
  }, []);

  return (
    <BwgContext.Provider value={{ state, hydrated, setState, clearAll }}>
      {children}
    </BwgContext.Provider>
  );
}

export function useBwgState(): BwgContextValue {
  const ctx = useContext(BwgContext);
  if (!ctx) {
    throw new Error("useBwgState must be used within BwgStateProvider");
  }
  return ctx;
}
