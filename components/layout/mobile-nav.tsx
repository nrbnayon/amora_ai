"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ROUTES } from "@/lib/constants"

interface MobileNavProps {
  navigation: Array<{ name: string; href: string }>
  user?: {
    name: string
    email: string
    avatar?: string
  }
}

export function MobileNav({ navigation, user }: MobileNavProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col space-y-4">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="flex items-center space-x-2" onClick={() => setOpen(false)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">A</span>
            </div>
            <span className="text-xl font-bold">Amora AI</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Actions */}
          {!user && (
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button variant="ghost" asChild>
                <Link href={ROUTES.SIGN_IN} onClick={() => setOpen(false)}>
                  Sign in
                </Link>
              </Button>
              <Button asChild>
                <Link href={ROUTES.SIGN_UP} onClick={() => setOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
