import { create } from "zustand";

interface FilterStore {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  selectedCategory: "",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
