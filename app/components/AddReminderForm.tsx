'use client'
import { useRemindersStore } from "../lib/reminderStore"
import { useState } from "react"
import { v4 as uuid } from 'uuid'

type ReminderForm = {
  pet: string;
  category: "General" | "Lifestyle" | "Health";
  title: string;
  notes: string;
  date: string;
  time: string;
};

export default function AddReminderForm() {
  const { reminders, setReminders } = useRemindersStore()
  const [form, setForm] = useState<ReminderForm>({
  pet: "",
  category: "General",
  title: "",
  notes: "",
  date: "",
  time: "",
});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.pet || !form.date || !form.time) {
      return alert('Fill in the missing details')
    }
    setReminders([...reminders, { id: uuid(), ...form, done: false }])
    setForm({ pet: "", category: "General", title: "", notes: "", date: "", time: ""})
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2 justify-center items-center py-6">
      <input className="input border border-black rounded-2xl p-2 bg-white" placeholder="Pet name" value={form.pet} onChange={e => setForm({ ...form, pet: e.target.value })} />
      <select className="input border border-black rounded-2xl p-2 bg-white" value={form.category} onChange={e => setForm({ ...form, category: e.target.value as ReminderForm["category"] })}>
        <option value="General">General</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Health">Health</option>
      </select>
      <input className="input border border-black rounded-2xl p-2 bg-white" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <textarea className="input border border-black rounded-2xl p-2 bg-white" placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
      <input type="date" className="input border border-black rounded-2xl p-2 bg-white" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
      <input type="time" className="input border border-black rounded-2xl p-2 bg-white" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
      <button type="submit" className="text-black bg-limegreen">Add Reminder</button>
    </form>
  )
}
