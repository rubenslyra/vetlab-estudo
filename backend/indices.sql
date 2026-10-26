-- Rodar DEPOIS de aplicar as migrations (as tabelas precisam existir):
--   docker compose cp indices.sql postgres:/tmp/indices.sql
--   docker compose exec -T postgres psql -U vetlab -d vetlab_db -f /tmp/indices.sql

CREATE INDEX IF NOT EXISTS idx_solicitacao_status
    ON produto.solicitacoes_exame (status);

CREATE INDEX IF NOT EXISTS idx_solicitacao_veterinario
    ON produto.solicitacoes_exame (crmv);

CREATE INDEX IF NOT EXISTS idx_solicitacao_data
    ON produto.solicitacoes_exame (data_criacao DESC);
