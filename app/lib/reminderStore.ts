import { create } from 'zustand'

export type Category = 'General' | 'Lifestyle' | 'Health';
export type DateFilter = 'today' | 'all';

export type Reminder = {
  id: string;
  pet: string;
  category: Category;
  title: string;
  notes?: string;
  date: string;
  time: string;
  done: boolean;
};

type State = {
  reminders: Reminder[];
  setReminders: (r: Reminder[]) => void;
  toggleDone: (id: string) => void;
  filters: {
    pet: string;
    category: Category | '';
    date: DateFilter;
  };
  setFilter: (filter: Partial<State['filters']>) => void;
};

export const useRemindersStore = create<State>((set) => ({
  reminders: [],
  setReminders: (r) => set({ reminders: r }),
  toggleDone: (id) =>
    set((state) => ({
      reminders: state.reminders.map((rem) =>
        rem.id === id ? { ...rem, done: !rem.done } : rem
      ),
    })),
     filters: { pet: '', category: '', date: 'all' },
  setFilter: (filter) =>
    set((state) => ({ filters: { ...state.filters, ...filter } })),
}));