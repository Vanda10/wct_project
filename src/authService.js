// authService.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://mkslcxldoihuzcxijabw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rc2xjeGxkb2lodXpjeGlqYWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzNjE1MTUsImV4cCI6MjAxOTkzNzUxNX0.40TikJDPUS8rgKYv4-YAMG1kvkpv7AzX4AynpRd3d08')
const auth = supabase.auth;

export default auth;
