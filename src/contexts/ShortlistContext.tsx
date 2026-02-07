import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Tour } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export interface ShortlistItem {
  tour: Tour;
  selectedDate: string;
  adults: number;
  children: number;
  infants: number;
  roomType: "single" | "double" | "triple";
}

interface ShortlistContextType {
  items: ShortlistItem[];
  addItem: (tour: Tour) => void;
  removeItem: (tourId: number) => void;
  updateItem: (tourId: number, updates: Partial<ShortlistItem>) => void;
  isInShortlist: (tourId: number) => boolean;
  clearAll: () => void;
  totalEstimate: number;
  compareList: Tour[];
  addToCompare: (tour: Tour) => void;
  removeFromCompare: (tourId: number) => void;
  isInCompare: (tourId: number) => boolean;
  clearCompare: () => void;
}

const ShortlistContext = createContext<ShortlistContextType | undefined>(undefined);

export function ShortlistProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [items, setItems] = useState<ShortlistItem[]>(() => {
    try {
      const saved = localStorage.getItem("engee-shortlist");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [compareList, setCompareList] = useState<Tour[]>([]);

  useEffect(() => {
    localStorage.setItem("engee-shortlist", JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((tour: Tour) => {
    setItems(prev => {
      if (prev.find(i => i.tour.id === tour.id)) return prev;
      toast({ title: "Added to Shortlist", description: `${tour.title} has been added.` });
      return [...prev, {
        tour, selectedDate: tour.nextAvailableDate, adults: 2, children: 0, infants: 0, roomType: "double" as const,
      }];
    });
  }, [toast]);

  const removeItem = useCallback((tourId: number) => {
    setItems(prev => {
      const item = prev.find(i => i.tour.id === tourId);
      if (item) toast({ title: "Removed", description: `${item.tour.title} removed from shortlist.` });
      return prev.filter(i => i.tour.id !== tourId);
    });
  }, [toast]);

  const updateItem = useCallback((tourId: number, updates: Partial<ShortlistItem>) => {
    setItems(prev => prev.map(i => i.tour.id === tourId ? { ...i, ...updates } : i));
  }, []);

  const isInShortlist = useCallback((tourId: number) => items.some(i => i.tour.id === tourId), [items]);

  const clearAll = useCallback(() => { setItems([]); toast({ title: "Shortlist cleared" }); }, [toast]);

  const totalEstimate = items.reduce((sum, item) => {
    const travelers = item.adults + item.children * 0.7;
    return sum + item.tour.pricePerPerson * travelers;
  }, 0);

  const addToCompare = useCallback((tour: Tour) => {
    setCompareList(prev => {
      if (prev.length >= 3) { toast({ title: "Compare limit", description: "You can compare up to 3 tours.", variant: "destructive" }); return prev; }
      if (prev.find(t => t.id === tour.id)) return prev;
      toast({ title: "Added to Compare", description: tour.title });
      return [...prev, tour];
    });
  }, [toast]);

  const removeFromCompare = useCallback((tourId: number) => {
    setCompareList(prev => prev.filter(t => t.id !== tourId));
  }, []);

  const isInCompare = useCallback((tourId: number) => compareList.some(t => t.id === tourId), [compareList]);
  const clearCompare = useCallback(() => setCompareList([]), []);

  return (
    <ShortlistContext.Provider value={{
      items, addItem, removeItem, updateItem, isInShortlist, clearAll, totalEstimate,
      compareList, addToCompare, removeFromCompare, isInCompare, clearCompare,
    }}>
      {children}
    </ShortlistContext.Provider>
  );
}

export const useShortlist = () => {
  const ctx = useContext(ShortlistContext);
  if (!ctx) throw new Error("useShortlist must be used within ShortlistProvider");
  return ctx;
};
