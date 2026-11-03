/* ARQUIVO: src/config/supabase.js — configuração do cliente Supabase. */

import { createClient } from "@supabase/supabase-js";
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
const url = process.env.SUPABASE_URL;
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key)
  throw new Error(
    "Configure SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no arquivo .env.",
  );
// Bloco funcional: define uma função ou configuração utilizada pelo restante do módulo.
export const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});
