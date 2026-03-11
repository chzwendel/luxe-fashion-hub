import { create } from "zustand";

interface FilterStore {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  selectedCategory: "",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
