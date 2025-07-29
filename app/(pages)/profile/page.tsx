"use client"

import { logout } from "@/app/redux/features/authSlice"
import { useAppDispatch, useAppSelector } from "@/app/redux/hook/hook"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { UserType } from "@/types/user"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProfilePage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  // const user = useAppSelector((state) => state.user.user)
  const user: UserType | null = useAppSelector((state) => state.user.user)
  

  const [open, setOpen] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState(user?.phone || "")

  if (!user) {
    router.push("/login")
    return null
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      dispatch(logout())
      router.push("/login")
    }
  }

  const handleSave = () => {
    // You can dispatch an update action here (updateUser({ name, email, phone }))
    console.log("Updated:", { name, email, phone })
    setOpen(false)
  }

  return (
    <div className="mt-20">
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="bg-white text-black p-6 rounded-lg shadow-md space-y-2">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>

          <div className="flex gap-4 mt-6 justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="cursor-pointer" variant="outline">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button className="cursor-pointer" onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
