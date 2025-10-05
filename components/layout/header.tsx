"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { MobileNav } from "@/components/layout/mobile-nav"
import { UserNav } from "@/components/layout/user-nav"
import { ROUTES } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface HeaderProps {
  user?: {
    name: string
    email: string
    avatar?: string
  }
}

const navigation = [
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/#pricing" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
]

export function Header({ user }: HeaderProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isAuthPage = pathname?.startsWith("/auth")
  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/wedding")

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isScrolled && "shadow-sm",
        isAuthPage && "relative border-none bg-transparent backdrop-blur-none",
      )}
    >
      <div className="container-responsive flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">A</span>
          </div>
          <span className="text-xl font-bold text-foreground">Amora AI</span>
        </Link>

        {/* Desktop Navigation */}
        {!isAuthPage && !isDashboard && (
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {user ? (
            <UserNav user={user} />
          ) : !isAuthPage ? (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href={ROUTES.SIGN_IN}>Sign in</Link>
              </Button>
              <Button asChild>
                <Link href={ROUTES.SIGN_UP}>Get Started</Link>
              </Button>
            </div>
          ) : null}

          {/* Mobile Navigation */}
          {!isAuthPage && <MobileNav navigation={navigation} user={user} />}
        </div>
      </div>
    </header>
  )
}
