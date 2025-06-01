export type TimeSlot = 'Morning' | 'Afternoon' | 'Evening' | 'Night';

export function getTimeSlot(time: string): TimeSlot {
  const [hour] = time.split(':').map(Number);

  if (hour >= 5 && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 17) return 'Afternoon';
  if (hour >= 17 && hour < 21) return 'Evening';
  return 'Night';
}