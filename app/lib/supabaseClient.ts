// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xfzvjxgkelgiiuyohock.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmenZqeGdrZWxnaWl1eW9ob2NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2MTEzNzksImV4cCI6MjA1ODE4NzM3OX0.k7ZJh_29cd0D132owkeFLlgSiL2vFvTuyfLD-aLI8Kw'

export const supabase = createClient(supabaseUrl, supabaseKey)