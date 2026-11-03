<?php
/* ARQUIVO: endpoint PHP da API; valida a requisição, consulta/processa dados e devolve resposta HTTP. */

declare(strict_types=1);

require_once __DIR__ . '/../config/supabase.php';

/* Cabeçalhos HTTP: informam o formato da resposta e regras de cache. */
header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    header('Allow: GET');
    echo json_encode([
        'erro' => true,
        'mensagem' => 'Método não permitido.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

/* Execução principal: trata erros e retorna mensagens controladas ao cliente. */
try {
    validarConfiguracaoSupabase();

    // A API REST do Supabase/PostgREST retorna as colunas da tabela brechos.
    // O filtro ativo=eq.true é aplicado apenas se sua tabela possuir a coluna "ativo".
    // Para manter compatibilidade com o esquema atual, consultamos todos os registros
    // e deixamos o front ignorar os inativos quando essa propriedade existir.
    $url = supabaseUrl() . '/rest/v1/brechos?select=*&order=id.asc';

    $curl = curl_init($url);

    if ($curl === false) {
        throw new RuntimeException('Não foi possível iniciar a conexão com o Supabase.');
    }

    curl_setopt_array($curl, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_HTTPHEADER => [
            'apikey: ' . supabaseAnonKey(),
            'Authorization: Bearer ' . supabaseAnonKey(),
            'Accept: application/json'
        ]
    ]);

    $resposta = curl_exec($curl);
    $erroCurl = curl_error($curl);
    $status = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);

    if ($resposta === false) {
        throw new RuntimeException('Falha ao consultar o Supabase: ' . $erroCurl);
    }

    if ($status < 200 || $status >= 300) {
        http_response_code($status > 0 ? $status : 502);
        echo json_encode([
            'erro' => true,
            'mensagem' => 'O Supabase recusou a consulta.',
            'detalhes' => json_decode($resposta, true) ?? $resposta
        ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    $dados = json_decode($resposta, true, 512, JSON_THROW_ON_ERROR);

    if (!is_array($dados)) {
        throw new RuntimeException('Resposta inesperada recebida do Supabase.');
    }

    // Se existir a coluna "ativo", não exibimos registros explicitamente inativos.
    $dados = array_values(array_filter($dados, static function ($brecho): bool {
        return !is_array($brecho) || !array_key_exists('ativo', $brecho) || $brecho['ativo'] !== false;
    }));

    echo json_encode($dados, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
} catch (Throwable $erro) {
    http_response_code(500);
    echo json_encode([
        'erro' => true,
        'mensagem' => $erro->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
