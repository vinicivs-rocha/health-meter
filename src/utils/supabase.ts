import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://brnvrspcnlfugenbwooy.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJybnZyc3BjbmxmdWdlbmJ3b295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgzOTU1NTYsImV4cCI6MjAzMzk3MTU1Nn0.1mOcZiL19aeFAGrDEd046M8ecvpdqsRHHTMAUyAHagg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})