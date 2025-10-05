"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/lib/constants"

export function VerificationSuccess() {
  return (
    <div className="w-full max-w-md space-y-8 text-center">
      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Account verified</h1>
          <p className="text-muted-foreground">You're all set to use your account securely</p>
        </div>
      </div>

      <Button asChild className="w-full">
        <Link href={ROUTES.DASHBOARD}>Log in</Link>
      </Button>
    </div>
  )
}
