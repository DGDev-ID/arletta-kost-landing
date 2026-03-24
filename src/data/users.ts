export interface User {
  id: number
  name: string
  email: string
  password: string
  phone: string
  room: string | null
}

/** Dummy user data for login simulation */
export const users: User[] = [
  {
    id: 1,
    name: 'Budi Santoso',
    email: 'budi@email.com',
    password: 'password123',
    phone: '081234567890',
    room: 'Kamar Deluxe A1',
  },
  {
    id: 2,
    name: 'Siti Rahayu',
    email: 'siti@email.com',
    password: 'password123',
    phone: '081298765432',
    room: null,
  },
]
