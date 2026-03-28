import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAILS = ["sedazam@gmail.com"];

export async function requireAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    redirect("/login");
  }

  const email = data.user.email ?? "";

  if (!ADMIN_EMAILS.includes(email)) {
    redirect("/login");
  }

  return data.user;
}
