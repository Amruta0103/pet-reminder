'use client';

import { useRemindersStore } from '../lib/reminderStore';

const pets = ['Milo', 'Luna', 'Bella']; // Ideally fetched from user data
const categories = ['General', 'Lifestyle', 'Health'];

export default function FilterBar() {
  const { filters, setFilter } = useRemindersStore();

  return (
    <div className="flex flex-wrap gap-4 items-center mb-4">
      <select
        value={filters.pet}
        onChange={(e) => setFilter({ pet: e.target.value })}
        className="p-2 border rounded"
      >
        <option value="">All Pets</option>
        {pets.map((pet) => (
          <option key={pet} value={pet}>
            {pet}
          </option>
        ))}
      </select>

      <select
        value={filters.category}
        onChange={(e) =>
          setFilter({ category: e.target.value as 'General' | 'Lifestyle' | 'Health' })
        }
        className="p-2 border rounded"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

     {/* <select
        value={filters.date}
        onChange={(e) => setFilter({ date: e.target.value as 'today' | 'all' })}
        className="p-2 rounded border"
      >
        <option value="today">Today</option>
        <option value="all">All</option>
      </select> */}

      <button
        onClick={() => setFilter({ pet: '', category: '', date: 'all' })}
        className="p-2 bg-gray-200 rounded"
      >
        Clear Filters
      </button>
    </div>
  );
}