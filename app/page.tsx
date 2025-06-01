'use client'
import { useRemindersStore } from "./lib/reminderStore"
import { useEffect } from "react"
import { motion } from "framer-motion"
import AddReminderForm from "./components/AddReminderForm"
import Link from "next/link"

export default function HomePage() {
  const { reminders, toggleDone, setReminders } = useRemindersStore();
  // const router = useRouter()

  useEffect(() => {
    // Fetch from API later; hardcoded sample for now
  }, [setReminders])

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-20 bg-softblue">
      
      {
        reminders.length > 1 ? 
        reminders.map(r => (
          <motion.div
            key={r.id}
            className={`p-4 border rounded-xl flex justify-between items-center ${r.done ? 'bg-limegreen' : "bg-softblue"}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Link className="hover:cursor-pointer" href={`/reminders/${r.id}`}>
              <div>
              <h2 className="font-semibold">{r.title}</h2>
              <p className="text-sm">{r.pet} — {r.time}</p>
              <p>{r.id}</p>
            </div>
            </Link>
            <button
              className="text-sm px-3 py-1 bg-blue-100 rounded hover:bg-blue-200"
              onClick={() => toggleDone(r.id)}
            >
              {r.done ? "Undo" : "Mark Done"}
            </button>
            
          </motion.div>
        ))
        :
        <div className="flex flex-col gap-4 justify-center items-center">
          <h1 className="text-2xl font-bold text-white">Today&apos;s Reminders</h1>
          Add your reminders and forget your worries about forgetting! 
        </div>
      }
      <AddReminderForm />
    </div>
  )
}
