"use client";

import { create } from "zustand";

interface SearchState {
  isOpen: boolean;
  query: string;
  setQuery: (q: string) => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useSearch = create<SearchState>()((set) => ({
  isOpen: false,
  query: "",
  setQuery: (q) => set({ query: q }),
  open: () => set({ isOpen: true, query: "" }),
  close: () => set({ isOpen: false, query: "" }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen, query: "" })),
}));
