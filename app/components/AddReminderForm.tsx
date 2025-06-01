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
  frequency: string;
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
  frequency: "Once",
});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.pet || !form.date || !form.time) return alert("Fill all required fields")

    setReminders([...reminders, { id: uuid(), ...form, done: false }])
    setForm({ pet: "", category: "General", title: "", notes: "", date: "", time: "", frequency: "Once" })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
      <input className="input" placeholder="Pet name" value={form.pet} onChange={e => setForm({ ...form, pet: e.target.value })} />
      <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value as ReminderForm["category"] })}>
        <option value="General">General</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="Health">Health</option>
      </select>
      <input className="input" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <textarea className="input" placeholder="Notes" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
      <input type="date" className="input" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
      <input type="time" className="input" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
      <input className="input" placeholder="Frequency" value={form.frequency} onChange={e => setForm({ ...form, frequency: e.target.value })} />
      <button type="submit" className="text-black bg-limegreen">Add Reminder</button>
    </form>
  )
}
