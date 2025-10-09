// app/admin/(auth)/forgot-password/page.tsx

import { AdminForgotPasswordForm } from "@/components/auth/AdminForgotPasswordForm";

export const metadata = {
  title: "Forgot Password - Admin",
  description: "Reset your admin password",
};

export default function AdminForgotPasswordPage() {
  return <AdminForgotPasswordForm />;
}
