
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Booking, TimeSlot } from '@/types/booking';

// Generate time slots from 9 AM to 5 PM
const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 9; hour < 17; hour++) {
    const hourStr = hour > 12 ? `${hour - 12}` : `${hour}`;
    const period = hour >= 12 ? 'PM' : 'AM';
    
    slots.push({
      id: `slot-${hour}-00`,
      time: `${hourStr}:00 ${period}`,
      available: true
    });
    
    slots.push({
      id: `slot-${hour}-30`,
      time: `${hourStr}:30 ${period}`,
      available: true
    });
  }
  return slots;
};

interface BookingState {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  getTimeSlots: (date: Date) => TimeSlot[];
  getBookingById: (id: string) => Booking | undefined;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      bookings: [],
      addBooking: (booking: Booking) => {
        set((state) => ({
          bookings: [...state.bookings, booking]
        }));
      },
      getTimeSlots: (date: Date) => {
        // Generate base time slots
        const slots = generateTimeSlots();
        
        // If there are existing bookings for this date, mark those slots as unavailable
        const bookings = get().bookings;
        const dateString = date.toDateString();
        
        const bookingsForDate = bookings.filter(
          (booking) => booking.date && booking.date.toDateString() === dateString
        );
        
        return slots.map(slot => {
          const isBooked = bookingsForDate.some(booking => booking.timeSlot === slot.id);
          return {
            ...slot,
            available: !isBooked
          };
        });
      },
      getBookingById: (id: string) => {
        return get().bookings.find(booking => booking.id === id);
      }
    }),
    {
      name: 'eco-drop-bookings'
    }
  )
);
