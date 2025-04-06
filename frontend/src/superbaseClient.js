import { createClient } from "@supabase/supabase-js";
const SUPERBASE_URL= "https://vomztlmipsxwxreoxxvn.supabase.co" ;
const SUPERBASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvbXp0bG1pcHN4d3hyZW94eHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MjAwNDYsImV4cCI6MjA1NTk5NjA0Nn0.Ct7GBYOt0aMHnxGUSRfTmpapG_PXGkrjidE4y8F_gHQ" ;

export const supabase = createClient(SUPERBASE_URL, SUPERBASE_KEY);