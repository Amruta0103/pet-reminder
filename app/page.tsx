'use client'
import { useRemindersStore } from "./lib/reminderStore"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import AddReminderForm from "./components/AddReminderForm"
import FilterBar from "./components/FilterReminders"

export default function HomePage() {
  const { reminders, toggleDone, setReminders, filters } = useRemindersStore();
  const [expand, setExpand] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const filtered = reminders.filter((reminder) => {
    const matchPet = filters.pet ? reminder.pet === filters.pet : true;
    const matchCategory = filters.category ? reminder.category === filters.category : true;
    return matchPet && matchCategory;
  });

  useEffect(() => {
    // Fetch from API later; hardcoded sample for now
    setReminders([
      { id: "1", pet: "Buddy", category: "Health", title: "Vet Visit", date: "2025-05-30", time: "09:00", done: false },
      { id: "2", pet: "Milo", category: "Lifestyle", title: "Morning Walk", date: "2025-05-30", time: "07:00", done: false }
    ])
  }, [setReminders])
  const triggerAlert = () => {
    setShowAlert(true);
  };
  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timeout); // clean up
    }
  }, [showAlert]);

  return (
    <div className="w-screen h-full min-h-screen flex flex-col justify-center items-center gap-20 bg-lavender">
      <div className="w-1/2 h-full flex flex-col gap-4 justify-center items-center text-center">
        <h2 className="text-2xl font-bold">Welcome to PetCare Pal! 🐶🐱 </h2>
        <p className="text-base"> 
          Your lightweight companion for remembering the little things that mean the world to your pet.
          Let’s make pet care joyful, stress-free, and right on time.
        </p>
      </div>
      <FilterBar />
      {
        reminders.length > 0 ? 
        <div className="w-4/5 h-full flex gap-8">
            <div className="flex flex-col gap-4 w-full h-full min-h-[250px] justify-center items-center">
            {
              filtered.map((r) => {
              if(r.done === false){
              return( 
              <motion.div
                key={r.id}
                className={`p-4 border flex flex-col gap-1 w-full h-auto justify-between items-center rounded-2xl cursor-pointer ${r.done ? 'bg-limegreen' : "bg-softblue"}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                onClick={()=>setExpand(r.id)}
              >
                <h2 className="font-semibold">{r.title}</h2>
                <p className="text-sm">{r.pet} — {r.time}</p>
                <p>{r.category}</p>
                <div className={`${expand === r.id ? 'flex' : 'hidden'} w-full justify-center items-center gap-6`}>
                  <button
                    className="min-w-[100px] text-sm bg-blue-100 rounded hover:bg-blue-200"
                    onClick={() => {
                      toggleDone(r.id)
                      setExpand(null)
                    }}
                  >
                    {r.done ? "Undo" : "Mark Done"}
                  </button>
                  <button
                    onClick={() => {
                      setExpand(null)
                      setReminders(reminders.filter(r => r.id !== expand))
                      triggerAlert()
                    }}
                    className="bg-red-300 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>            
              </motion.div>
              )}})
            }
            </div>
            <div className="flex flex-col gap-4 w-full h-full min-h-[250px] justify-center items-center">
            {
              filtered.map((r) => {
              if(r.done === true){
              return( 
              <motion.div
                key={r.id}
                className={`p-4 border flex flex-col gap-1 w-full h-auto justify-between items-center rounded-2xl cursor-pointer ${r.done ? 'bg-limegreen' : "bg-softblue"}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                onClick={()=>setExpand(r.id)}
              >
                <h2 className="font-semibold">{r.title}</h2>
                <p className="text-sm">{r.pet} — {r.time}</p>
                <p>{r.category}</p>
                <div className={`${expand === r.id ? 'flex' : 'hidden'} w-full justify-center items-center gap-6`}>
                  <button
                    className="min-w-[100px] text-sm bg-blue-100 rounded hover:bg-blue-200"
                    onClick={() => {
                      toggleDone(r.id)
                      setExpand(null)
                    }}
                  >
                    {r.done ? "Undo" : "Mark Done"}
                  </button>
                  <button
                    onClick={() => {
                      setExpand(null)
                      setReminders(reminders.filter(r => r.id !== expand))
                      triggerAlert()
                    }}
                    className="bg-red-300 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>            
              </motion.div>
              )}})
            }
            </div>
        </div>
        :
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-xl font-medium">You have no reminders yet 🐾 </p>
          <p className="text-sm text-slate-700">Tap the + button to create your first one — your pet will thank you!</p>
        </div>
      }
      {showAlert && (
        <div className="flex w-fit h-fit relative top-0 left-0 bottom-0 right-0 bg-green-100 border border-green-400 text-green-800 px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          ✅ Done and Dusted
        </div>
      )}
      <AddReminderForm />
    </div>
  )
}
