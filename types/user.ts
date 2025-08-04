export type UserType = {
  _id: string 
  name: string | null
  email: string
  phone: string  // ← Add this line
  password: string 
  isAdmin : boolean // ← Add this line
}
