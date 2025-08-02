"use client"

import { logout, setUser } from "@/app/redux/features/authSlice"
import { useAppDispatch, useAppSelector } from "@/app/redux/hook/hook"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { UserType } from "@/types/user"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user: UserType | null = useAppSelector((state) => state.user.user)

  const [open, setOpen] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [phone, setPhone] = useState(user?.phone || "")

  // Redirect only on client side
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      dispatch(logout())
      router.push("/user/login")
    }
  }
  

  const handleSave = async () => {
    if (!user?._id) return console.error("User ID is missing")
      
    try {
      const res = await fetch(`http://localhost:4000/api/user/update/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
        credentials: "include",
      })

      const data = await res.json()
      console.log("Profile update response:", data);
      

      if (!res.ok) throw new Error(data?.message || "Failed to update profile")

      dispatch(setUser(data.payload.user))
      setOpen(false)
    } catch (error) {
      console.error("Profile update failed:", error)
    }
  }

  return (
    <div className="mt-20">
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="bg-white text-black p-6 rounded-lg shadow-md space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Email:</strong> {user.email}</p>

          <div className="flex gap-4 mt-6 justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
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
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <Input
                    type="email"
                    value={user.email}
                    disabled
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
