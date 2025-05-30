import { create } from 'zustand'

export type Reminder = {
  id: string;
  pet: string;
  category: 'General' | 'Lifestyle' | 'Health';
  title: string;
  notes?: string;
  date: string; // ISO string
  time: string; // HH:mm
  frequency: string;
  done: boolean;
};

type State = {
  reminders: Reminder[];
  setReminders: (r: Reminder[]) => void;
  toggleDone: (id: string) => void;
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
}));