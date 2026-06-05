import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tzfgwiltlzepwkvbiyet.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6Zmd3aWx0bHplcHdrdmJpeWV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NTYyMzMsImV4cCI6MjA5NjIzMjIzM30.qBNmNATfQHLyW_6U3C0h5-N_Aqm9Bs--4R95f8jphfI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
