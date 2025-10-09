// app/admin/(auth)/login/page.tsx

import { AdminLoginForm } from "@/components/auth/AdminLoginForm";

export const metadata = {
  title: "Admin Login",
  description: "Admin authentication portal",
};

export default function AdminLoginPage() {
  return <AdminLoginForm />;
}
