import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qkssbptojyntrufcmxdx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrc3NicHRvanludHJ1ZmNteGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIyNDQ5MTksImV4cCI6MTk5NzgyMDkxOX0.S2T6fopdi81njWSG82AWFWhI3bIVCB4lW15-GLWxWhM"
);

export default supabase;