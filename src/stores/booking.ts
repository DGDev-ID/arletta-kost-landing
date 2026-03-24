import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Booking {
  id: number
  roomName: string
  roomSlug: string
  date: string
  status: 'pending' | 'confirmed' | 'cancelled'
}

export const useBookingStore = defineStore('booking', () => {
  const bookings = ref<Booking[]>([])
  let nextId = 1

  function addBooking(roomName: string, roomSlug: string): Booking {
    const booking: Booking = {
      id: nextId++,
      roomName,
      roomSlug,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      status: 'pending',
    }
    bookings.value.push(booking)
    return booking
  }

  function cancelBooking(id: number) {
    const booking = bookings.value.find((b) => b.id === id)
    if (booking) {
      booking.status = 'cancelled'
    }
  }

  function clearBookings() {
    bookings.value = []
  }

  return { bookings, addBooking, cancelBooking, clearBookings }
})
