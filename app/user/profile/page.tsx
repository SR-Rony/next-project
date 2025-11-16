"use client"

import { logout, setUser } from "@/app/redux/features/authSlice"
import { useAppDispatch, useAppSelector } from "@/app/redux/hook/hook"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { UserType } from "@/types/user"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import axiosInstance from "@/lib/axiosInstance"

export default function ProfilePage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user: UserType | null = useAppSelector((state) => state.user.user)

  const [open, setOpen] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [phone, setPhone] = useState(user?.phone || "")

  // Redirect to login if user not found
  useEffect(() => {
    if (!user) {
      router.push("/user/login")
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
      const res = await axiosInstance.put(`/user/update/${user._id}`, {
        name,
        phone,
      })

      const data = res.data

      if (!res.status.toString().startsWith("2")) {
        toast.error(data.message || "Profile update failed")
        return
      }

      dispatch(setUser(data.payload.user))
      toast.success("Profile updated successfully!")
      setOpen(false)
    } catch (error) {
      console.error("Profile update failed:", error)
      toast.error("Profile update failed")
    }
  }

  return (
    <div className="mt-20">
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="bg-white text-black p-6 rounded-lg shadow-md space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Phone:</strong> {user.phone}</p>

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
