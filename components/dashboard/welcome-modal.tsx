"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4 px-5">
          <div className="mx-auto">
            <Image
              src="/welcome.png"
              alt="Wedding couple illustration"
              width={120}
              height={120}
              className="mx-auto"
            />
          </div>
          <DialogTitle className="text-2xl text-center font-bold pb-0 mb-0">Welcome to Amora AI</DialogTitle>
          <p className="text-muted-foreground text-center">
            Make your smart planning AI partner. Ready to make plannings fast and easy?
          </p>
        </DialogHeader>
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={() => setIsOpen(false)}
            className="w-[80%] bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Get Started
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
