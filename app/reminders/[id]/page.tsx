'use client'
import { useRemindersStore } from "../../lib/reminderStore"
import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function EditReminderPage() {
  const { id } = useParams()
  const { reminders, setReminders } = useRemindersStore()
  const router = useRouter()

  const reminder = reminders.find(r => r.id === id)
  const [form, setForm] = useState(reminder)

  useEffect(() => {
    if (reminder) setForm(reminder)
  }, [reminder])

  const handleSave = () => {
    if (!form) return
    const updated = reminders.map(r => r.id === id ? form : r)
    setReminders(updated)
    router.push('/')
  }
  console.log(id, reminders, reminder, form);
  if (!form) return <div>Reminder not found</div>

  return (
    <div className="p-4 space-y-3">
      <input className="input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      {/* Repeat inputs for all fields like in Add Form */}
      <button onClick={handleSave} className="bg-green-500 px-4 py-2 text-white rounded">Save</button>
      <button onClick={() => router.back()} className="ml-2">Cancel</button>
      
    </div>
  )
}