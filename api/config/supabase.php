<?php
/* ARQUIVO: endpoint PHP da API; valida a requisição, consulta/processa dados e devolve resposta HTTP. */

declare(strict_types=1);

/**
 * Configuração mínima do Supabase sem dependências externas.
 *
 * As credenciais são lidas do arquivo .env na raiz do projeto.
 * Use apenas a chave anon/publishable nesta etapa. A chave service_role
 * não deve ser exposta nem utilizada para endpoints públicos.
 */

function carregarEnv(string $arquivo): void
{
    if (!is_file($arquivo)) {
        return;
    }

    $linhas = file($arquivo, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    if ($linhas === false) {
        return;
    }

    foreach ($linhas as $linha) {
        $linha = trim($linha);

        if ($linha === '' || str_starts_with($linha, '#') || !str_contains($linha, '=')) {
            continue;
        }

        [$chave, $valor] = array_map('trim', explode('=', $linha, 2));
        $valor = trim($valor, "\"'");

        if ($chave !== '' && getenv($chave) === false) {
            putenv("{$chave}={$valor}");
            $_ENV[$chave] = $valor;
        }
    }
}

carregarEnv(dirname(__DIR__, 2) . '/.env');

function env(string $chave, ?string $padrao = null): ?string
{
    $valor = getenv($chave);

    return $valor === false || $valor === '' ? $padrao : $valor;
}

function supabaseUrl(): string
{
    return rtrim((string) env('SUPABASE_URL', ''), '/');
}

function supabaseAnonKey(): string
{
    return (string) env('SUPABASE_ANON_KEY', env('SUPABASE_PUBLISHABLE_KEY', ''));
}

function validarConfiguracaoSupabase(): void
{
    if (supabaseUrl() === '' || supabaseAnonKey() === '') {
        throw new RuntimeException(
            'Supabase não configurado. Copie .env.example para .env e preencha SUPABASE_URL e SUPABASE_ANON_KEY.'
        );
    }
}
